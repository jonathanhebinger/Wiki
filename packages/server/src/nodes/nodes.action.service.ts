import { Action } from '@brainote/common'
import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'

import { IoGateway } from '../io/io.gateway'
import { NodesService } from './nodes.service'

@Injectable()
export class NodeActionService {
  constructor(private service: NodesService, private io: IoGateway) {
    this.io.onAction((action, socket) => {
      this.handleAction(action, socket)
    })
  }

  private handleAction(action: Action.Any, socket: Socket) {
    switch (action.type) {
      case 'create':
        return this.handleActionCreate(action.payload, socket)
      case 'update':
        return this.handleActionUpdate(action.payload)
      case 'delete':
        return this.handleActionDelete(action.payload)

      case 'tag.create':
        return this.handleActionTagCreate(action.payload, socket)
      case 'tag.add':
        return this.handleActionTagAdd(action.payload)
      case 'tag.move':
        return this.handleActionTagMove(action.payload)
      case 'tag.remove':
        return this.handleActionTagRemove(action.payload)
    }
  }

  private handleActionCreate(payload: Action.Payload.Create, socket: Socket) {
    const node = this.service.create(payload)

    this.io.broadcast({
      type: 'set',
      payload: [node],
    })

    this.io.emit(socket, {
      type: 'open',
      payload: NodeId,
    })

    return node
  }
  private handleActionUpdate(payload: Action.Payload.Update) {
    const node = this.service.update(payload)

    this.io.broadcast({
      type: 'set',
      payload: [node],
    })
  }
  private handleActionDelete(payload: Action.Payload.Delete) {
    this.service.delete(payload)

    this.io.broadcast({
      type: 'delete',
      payload: payload,
    })
  }

  private handleActionTagCreate(
    { node, name }: Action.Tag.Payload.Create,
    socket: Socket,
  ) {
    const tag = this.handleActionCreate({ name, tags: [] }, socket)

    this.handleActionTagAdd({ node, tag: tag.id })
  }
  private handleActionTagAdd(payload: Action.Tag.Payload.Add) {
    const node = this.service.tagAdd(payload)

    this.io.broadcast({
      type: 'set',
      payload: [node],
    })
  }
  private handleActionTagMove(payload: Action.Tag.Payload.Move) {
    const node = this.service.tagMove(payload)

    this.io.broadcast({
      type: 'set',
      payload: [node],
    })
  }
  private handleActionTagRemove(payload: Action.Tag.Payload.Remove) {
    const node = this.service.tagRemove(payload)

    this.io.broadcast({
      type: 'set',
      payload: [node],
    })
  }
}
