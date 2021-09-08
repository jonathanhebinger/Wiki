import { Observable, Observer } from './observable'
import { Particle } from './particle'
import { Universe } from './universe'

export class Atom<State> implements Observable<State> {
  protected universe: Universe
  protected particle: Particle<State>

  constructor(universe: Universe, state: State, particle?: Particle<State>) {
    this.universe = universe
    this.particle = particle || new Particle<State>(state)
  }

  get state() {
    return this.particle.state
  }
  set state(state: State) {
    this.particle.state = state
  }

  get() {
    this.universe.on.atom.get.emit({ atom: this })

    return this.state
  }
  set(state: State) {
    this.universe.on.atom.set.emit({ atom: this, state })
  }

  emit() {
    this.particle.emit()
  }

  observe(observer: Observer<State>) {
    return this.particle.observe(observer)
  }
  unobserve(observer: Observer<State>) {
    this.particle.unobserve(observer)
  }

  static clone<S>(atom: Atom<S>) {
    return new Atom(atom.universe, atom.state, atom.particle)
  }
  static cloneReadonly<S>(atom: Atom<S>) {
    return new AtomReadonly(atom.universe, atom.state, atom.particle)
  }
  static portal<S>(universe: Universe, atom: Atom<S>) {
    return new Atom(universe, atom.state, atom.particle)
  }
  static portalReadonly<S>(universe: Universe, atom: Atom<S>) {
    return new AtomReadonly(universe, atom.state, atom.particle)
  }
}

export class AtomReadonly<State> extends Atom<State> {
  set() {}
}
