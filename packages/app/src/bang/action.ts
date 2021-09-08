import { Observable, Observer } from './observable'
import { Pulsar } from './pulsar'
import { Universe } from './universe'

export type ActionEventPayload<A extends any[], R> = {
  args: A
  result: R
}
export class Action<A extends any[], R>
  implements Observable<ActionEventPayload<A, R>>
{
  private pulsar = new Pulsar<ActionEventPayload<A, R>>()

  constructor(private universe: Universe, private handler: (...args: A) => R) {}

  execute(...args: A) {
    try {
      this.universe.on.action.exec.emit({ action: this })

      const result = this.handler(...args)

      this.universe.on.action.done.emit({ action: this })

      this.pulsar.emit({ args, result })

      return result
    } catch (e) {
      this.universe.on.action.done.emit({ action: this })

      throw e
    }
  }

  observe(observer: Observer<ActionEventPayload<A, R>>) {
    return this.pulsar.observe(observer)
  }
  unobserve(observer: Observer<ActionEventPayload<A, R>>) {
    this.pulsar.unobserve(observer)
  }
}
