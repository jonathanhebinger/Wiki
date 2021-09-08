import { createDraft, current, finishDraft, isDraft, isDraftable } from 'immer'
import { useEffect, useMemo, useState } from 'react'
import { v4 } from 'uuid'

export type Observer<S> = (state: S) => void
export type ObserverTerminator = () => void
export type Observable<S> = {
  observe(observer: Observer<S>): ObserverTerminator
  unobserve(observer: Observer<S>): void
}

export class Pulsar<S> implements Observable<S> {
  observers = new Set<Observer<S>>()

  emit(state: S) {
    ;[...this.observers].forEach(observer => observer(state))
  }

  observe(observer: Observer<S>) {
    this.observers.add(observer)

    return () => this.unobserve(observer)
  }
  unobserve(observer: Observer<S>) {
    this.observers.delete(observer)
  }
}

export class Universe {
  on = {
    atom: {
      get: new Pulsar<{ atom: Atom<any> }>(),
      set: new Pulsar<{ atom: Atom<any>; state: any }>(),
    },
    action: {
      exec: new Pulsar<{ action: Action<any, any> }>(),
      done: new Pulsar<{ action: Action<any, any> }>(),
    },
  }

  constructor() {
    new ActionContext(this)
  }
}

export class Atom<S> implements Observable<S> {
  constructor(
    protected universe: Universe,
    protected state: S,
    private pulsar = new Pulsar<S>(),
  ) {}

  get() {
    this.universe.on.atom.get.emit({ atom: this })

    return this.state
  }
  set(state: S) {
    this.universe.on.atom.set.emit({ atom: this, state })
  }

  emit() {
    this.pulsar.emit(this.state)
  }

  observe(observer: Observer<S>) {
    return this.pulsar.observe(observer)
  }
  unobserve(observer: Observer<S>) {
    this.pulsar.unobserve(observer)
  }

  static get<S>(atom: Atom<S>) {
    return atom.state
  }
  static set<S>(atom: Atom<S>, state: S) {
    atom.state = state
  }
}

export class Computed<S> extends Atom<S> {
  private deps: Map<Atom<any>, ObserverTerminator> = new Map()
  private memo: any[] = []

  constructor(protected universe: Universe, private compute: () => S) {
    super(universe, null as any)

    this.update(true)
  }

  update(forceCompute = false) {
    if (!forceCompute && !this.shouldRecompute()) return

    const atoms = new Set<Atom<any>>()
    const terminator = this.universe.on.atom.get.observe(({ atom }) => {
      if (atom === this) return

      atoms.add(atom)
    })

    try {
      const state = this.compute()

      this.deps.forEach(terminator => {
        terminator()
      })
      this.deps.clear()

      atoms.forEach(atom => {
        this.deps.set(
          atom,
          atom.observe(() => {
            this.update()
          }),
        )
      })

      if (state !== this.state) {
        this.state = state

        this.emit()
      }
    } finally {
      terminator()
    }
  }

  shouldRecompute() {
    const memo = [...this.deps.keys()].map(atom => {
      return Atom.get(atom)
    })
    const shouldRecompute = memo.some((value, index) => {
      return value !== this.memo[index]
    })

    this.memo = memo

    return shouldRecompute
  }

  get() {
    if (this.shouldRecompute()) {
      this.set(this.compute())
    }

    return super.get()
  }
}

export class Action<A extends any[], R> {
  constructor(private universe: Universe, private handler: (...args: A) => R) {}

  execute(...args: A) {
    try {
      this.universe.on.action.exec.emit({ action: this })

      return this.handler(...args)
    } finally {
      this.universe.on.action.done.emit({ action: this })
    }
  }
}

export class ActionContext {
  stack: Action<any, any>[] = []
  atoms: Map<Atom<any>, any> = new Map()

  get readonly() {
    return this.stack.length === 0
  }

  constructor(universe: Universe) {
    universe.on.atom.get.observe(({ atom }) => {
      if (this.readonly) return

      const state = Atom.get(atom)

      if (!this.atoms.has(atom)) {
        this.atoms.set(atom, state)
      }

      if (isDraftable(state) && !isDraft(state)) {
        Atom.set(atom, createDraft(state))
      }
    })
    universe.on.atom.set.observe(({ atom, state }) => {
      if (this.readonly) return

      if (!this.atoms.has(atom)) {
        this.atoms.set(atom, Atom.get(atom))
      }

      Atom.set(atom, state)
    })

    universe.on.action.exec.observe(({ action }) => {
      this.stack.push(action)
    })
    universe.on.action.done.observe(() => {
      this.stack.pop()

      if (!this.readonly) return

      const toEmit: Atom<any>[] = []

      this.atoms.forEach((previous, atom) => {
        let state = Atom.get(atom)

        if (isDraft(state)) {
          state = finishDraft(state)
        }

        if (Array.isArray(state)) {
          state = state.map(item => {
            return isDraft(item) ? current(item) : item
          })
        }

        if (state !== previous) {
          Atom.set(atom, state)

          toEmit.push(atom)
        }
      })

      this.atoms.clear()

      toEmit.forEach(atom => {
        atom.emit()
      })
    })
  }
}

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? A
  : B
type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >
}[keyof T]
type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >
}[keyof T]
type StateKeys<T> = {
  [P in keyof T]-?: IfEquals<T[P], (...args: any[]) => any, never, P>
}[keyof T]
type ActionsKeys<T> = {
  [P in keyof T]-?: IfEquals<T[P], (...args: any[]) => any, P>
}[keyof T]

export function createSystem<C extends object>(
  universe: Universe,
  structure: C &
    ThisType<
      {
        [K in keyof C]: C[K] extends Atom<infer S> ? S : C[K]
      }
    >,
): [
  {
    readonly [K in keyof C]: C[K] extends Atom<infer S> ? S : C[K]
  },
  {
    readonly [K in ReadonlyKeys<C>]: Computed<C[K]>
  } &
    {
      readonly [K in WritableKeys<C>]: C[K] extends (...args: any[]) => any
        ? Action<Parameters<C[K]>, ReturnType<C[K]>>
        : C[K] extends Atom<any>
        ? C[K]
        : Atom<C[K]>
    },
] {
  const projection: any = {}
  const system: any = {}

  const s = new Map<string, any>()
  const c = new Map<string, () => any>()
  const a = new Map<string, (...args: any[]) => any>()

  Object.keys(structure).forEach(key => {
    const descriptor = Object.getOwnPropertyDescriptor(structure, key)

    if (!descriptor) return

    if (descriptor.get) {
      c.set(key, descriptor.get)
    } else if (typeof descriptor.value === 'function') {
      a.set(key, descriptor.value)
    } else {
      s.set(key, descriptor.value)
    }
  })

  s.forEach((state, key) => {
    const atom = state instanceof Atom ? state : new Atom(universe, state)

    system[key] = atom

    Object.defineProperty(projection, key, {
      get() {
        return atom.get()
      },
      set(state: any) {
        atom.set(state)
      },
      configurable: false,
    })
  })

  c.forEach((compute, key) => {
    const computed = new Computed(universe, compute.bind(projection))

    system[key] = computed

    Object.defineProperty(projection, key, {
      get() {
        return computed.get()
      },
      configurable: false,
    })
  })

  a.forEach((handler, key) => {
    const action = new Action(universe, handler.bind(projection))

    system[key] = action

    Object.defineProperty(projection, key, {
      value: action.execute.bind(action),
      writable: false,
      configurable: false,
    })
  })

  return [projection, system]
}

function useSystem<C extends object>(
  universe: Universe,
  structure: C & ThisType<C>,
): [
  { [K in StateKeys<C>]: C[K] },
  { [K in ActionsKeys<C>]: C[K] },
  {
    readonly [K in ReadonlyKeys<C>]: Computed<C[K]>
  } &
    {
      readonly [K in WritableKeys<C>]: C[K] extends (...args: any[]) => any
        ? Action<Parameters<C[K]>, ReturnType<C[K]>>
        : Atom<C[K]>
    },
] {
  const [state, state$set] = useState({} as any)

  const { actions, system, terminators } = useMemo(() => {
    const [projection, system] = createSystem(universe, structure)

    const actions: any = {}
    const terminators = new Set<ObserverTerminator>()

    Object.keys(system).forEach(key => {
      const item = system[key as keyof typeof system] as
        | Atom<any>
        | Action<any, any>

      if (item instanceof Atom) {
        item.observe(value => {
          state$set({ ...state, [key]: value })
        })
      } else if (item instanceof Action) {
        actions[key] = projection[key as keyof typeof system]
      }
    })

    return { actions, system, terminators }
  }, [])

  useEffect(() => {
    return () => {
      terminators.forEach(terminator => {
        terminator()
      })
    }
  }, [])

  return [state, actions, system]
}

type TodoState = 'todo' | 'ongoing' | 'done'
type Todo = { id: string; name: string; state: TodoState }
type Filter = 'all' | TodoState

const universe = new Universe()

const filter = new Atom<Filter>(universe, 'all')

const [todos, todosSystem] = createSystem(universe, {
  todos: [] as Todo[],
  filter: filter,

  get filtered(): Todo[] {
    return this.filter === 'all'
      ? [...this.todos]
      : this.todos.filter((todo: Todo) => todo.state === this.filter)
  },

  create(name: string) {
    const id = v4()

    this.todos.push({ id, name, state: 'todo' })

    return id
  },
  update(id: string) {
    this.todos.forEach(todo => {
      if (todo.id !== id) return

      todo.state = todo.state === 'todo' ? 'ongoing' : 'done'
    })
  },
  delete(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  },

  update_filter(filter: Filter) {
    this.filter = filter
  },
})

console.log(todos.filtered)

const idA = todos.create('Todo A')
const idB = todos.create('Todo B')

todos.update(idA)

console.log(todos.filtered)

//todos.update_filter('todo')

console.log(todos.filtered)

console.log('delete')
todos.delete(idB)
console.log('delete done')

console.log(todos.filtered)

const reset = new Action(universe, () => filter.set('all'))

console.log(todos.filtered)
reset.execute()

console.log(todos.filtered)
