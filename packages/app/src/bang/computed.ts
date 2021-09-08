import { Atom } from './atom'
import { ObserverTerminator } from './observable'
import { Universe } from './universe'

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
      return atom.state
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
