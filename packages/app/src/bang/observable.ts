export type Observer<S> = (state: S) => void
export type ObserverTerminator = () => void
export type Observable<S> = {
  observe(observer: Observer<S>): ObserverTerminator
  unobserve(observer: Observer<S>): void
}
