import { Action, Event } from '@brainote/common'
import { createStore, createTypedHooks } from 'easy-peasy'
import socket from 'socket.io-client'
import { app, AppModel } from 'src/app/model'

export const store = createStore(app)

export const { useStoreActions, useStoreState } = createTypedHooks<AppModel>()

export const io = socket('http://localhost:3000')

export function emit(action: Action.Any) {
  io.emit('action', action)
}

const actions = store.getActions()

io.on('event', (event: Event.Any) => {
  console.log('EVENT :', event)
  switch (event.type) {
    case 'init':
      actions.nodes.init(event.payload.nodes)
      break
    case 'set':
      actions.nodes.set(event.payload)
      break
    case 'delete':
      actions.nodes.delete(event.payload)
      break

    case 'open':
      actions.open(event.payload)
      break
  }
})
