import { Action } from './action'
import { Atom } from './atom'
import { Computed } from './computed'
import { Particle } from './particle'
import { Universe } from './universe'

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
type ParticleKeys<T> = {
  [P in keyof T]-?: T[P] extends Particle<any> ? P : never
}[keyof T]
type AtomsKeys<T> = {
  [P in keyof T]-?: T[P] extends Atom<any> ? P : never
}[keyof T]
type OtherKeys<T> = {
  [P in keyof T]-?: T[P] extends Atom<any>
    ? never
    : T[P] extends Particle<any>
    ? never
    : P
}[keyof T]

export type SystemStructureThis<C extends object> = ThisType<
  {
    [K in OtherKeys<C>]: C[K]
  } &
    {
      readonly [K in AtomsKeys<C>]: C[K] extends Atom<infer S> ? S : never
    } &
    {
      readonly [K in ParticleKeys<C>]: C[K] extends Particle<infer S>
        ? S
        : never
    }
>

export type SystemStateKeys<T> = {
  [P in keyof T]-?: T[P] extends (...args: any[]) => any ? never : P
}[keyof T]
export type SystemActionsKeys<T> = {
  [P in keyof T]-?: T[P] extends (...args: any[]) => any ? P : never
}[keyof T]

export type SystemState<C extends object> = {
  readonly [K in SystemStateKeys<C>]: C[K]
} &
  {
    readonly [K in ReadonlyKeys<C>]: C[K]
  }
export type SystemActions<C extends object> = {
  readonly [K in SystemActionsKeys<C>]: C[K]
}
export type SystemRefs<C extends object> = {
  readonly [K in ReadonlyKeys<C>]: Computed<C[K]>
} &
  {
    readonly [K in WritableKeys<C>]: C[K] extends (...args: any[]) => any
      ? Action<Parameters<C[K]>, ReturnType<C[K]>>
      : C[K] extends Atom<any>
      ? C[K]
      : C[K] extends Particle<any>
      ? C[K]
      : Atom<C[K]>
  }
export type System<C extends object> = {
  readonly [K in keyof C]: C[K] extends Atom<infer S> ? S : C[K]
} & {
  readonly $$: SystemRefs<C>
}

export function createSystem<C extends object>(
  structure: C & SystemStructureThis<C>,
  universe: Universe = new Universe(),
): System<C> {
  const system: any = { $$: {} }

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

  s.forEach((item, key) => {
    if (item instanceof Particle) {
      const atom = new Atom(universe, item.state, item)

      system.$$[key] = atom

      Object.defineProperty(system, key, {
        get() {
          return atom.get()
        },
        configurable: false,
      })
    } else if (item instanceof Computed) {
      const atom = Atom.portalReadonly(universe, item)

      system.$$[key] = atom

      Object.defineProperty(system, key, {
        get() {
          const state = item.get()

          atom.state = state

          return atom.get()
        },
        configurable: false,
      })
    } else {
      const atom =
        item instanceof Atom
          ? Atom.portalReadonly(universe, item)
          : new Atom(universe, item)

      system.$$[key] = atom

      Object.defineProperty(system, key, {
        set(state) {
          atom.set(state)
        },
        get() {
          return atom.get()
        },
        configurable: false,
      })
    }
  })

  c.forEach((compute, key) => {
    const computed = new Computed(universe, compute.bind(system))

    system.$$[key] = computed

    Object.defineProperty(system, key, {
      get() {
        return computed.get()
      },
      configurable: false,
    })
  })

  a.forEach((handler, key) => {
    const action = new Action(universe, handler.bind(system))

    system.$$[key] = action

    Object.defineProperty(system, key, {
      value: action.execute.bind(action),
      writable: false,
      configurable: false,
    })
  })

  return system
}
