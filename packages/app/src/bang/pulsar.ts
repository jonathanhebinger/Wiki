import { Observable, Observer } from './observable'

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
