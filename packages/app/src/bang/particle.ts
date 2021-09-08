import { Observable, Observer } from './observable'
import { Pulsar } from './pulsar'

export class Particle<S> implements Observable<S> {
  constructor(public state: S, public pulsar = new Pulsar<S>()) {}

  emit() {
    this.pulsar.emit(this.state)
  }

  observe(observer: Observer<S>) {
    return this.pulsar.observe(observer)
  }
  unobserve(observer: Observer<S>) {
    this.pulsar.unobserve(observer)
  }

  static clone<S>(particle: Particle<S>) {
    return new Particle(particle.state, particle.pulsar)
  }
}
