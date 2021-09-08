import { Action } from './action'
import { ActionContext } from './action.context'
import { Atom } from './atom'
import { Pulsar } from './pulsar'

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
