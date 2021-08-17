import { Action, Event, Query } from '@brainote/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

export type QueryListener = (query: Query.Any, socket: Socket) => void
export type ActionListener = (event: Action.Any, socket: Socket) => void

@WebSocketGateway()
export class IoGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  queryListeners = new Set<QueryListener>()
  actionListeners = new Set<ActionListener>()

  handleConnection(socket: Socket) {
    console.log('connection')

    this.handleQuery({ type: 'init', payload: {} }, socket)
  }

  @SubscribeMessage('action')
  handleAction(
    @MessageBody() action: Action.Any,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('ACTION:', action)

    this.actionListeners.forEach(listener => listener(action, socket))
  }

  @SubscribeMessage('query')
  handleQuery(
    @MessageBody() query: Query.Any,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log('QUERY:', query)

    this.queryListeners.forEach(listener => listener(query, socket))
  }

  emit(socket: Socket | Server, event: Event.Any) {
    console.log('EVENT:', event)

    socket.emit('event', event)
  }

  broadcast(event: Event.Any) {
    this.emit(this.server, event)
  }

  onQuery(listener: QueryListener) {
    this.queryListeners.add(listener)

    return () => this.queryListeners.delete(listener)
  }
  onAction(listener: ActionListener) {
    this.actionListeners.add(listener)

    return () => this.actionListeners.delete(listener)
  }
}
