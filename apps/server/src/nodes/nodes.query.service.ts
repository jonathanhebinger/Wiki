import { Query } from '@brainote/domain'
import { Injectable } from '@nestjs/common'
import { Socket } from 'socket.io'

import { IoGateway } from '../io/io.gateway'
import { NodesService } from './nodes.service'

@Injectable()
export class NodeQueryService {
  constructor(private service: NodesService, private io: IoGateway) {
    this.io.onQuery((query, socket) => {
      this.handleQuery(query, socket)
    })
  }

  private handleQuery(query: Query.Any, socket: Socket) {
    switch (query.type) {
      case 'init':
        return this.handleInit(socket)
    }
  }

  private handleInit(socket) {
    this.io.emit(socket, {
      type: 'init',
      payload: {
        nodes: this.service.findAll(),
      },
    })
  }
}
