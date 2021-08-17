import { Module } from '@nestjs/common'

import { IoModule } from '../io/io.module'
import { NodeActionService } from './nodes.action.service'
import { NodeQueryService } from './nodes.query.service'
import { NodesService } from './nodes.service'

@Module({
  imports: [IoModule],
  providers: [NodesService, NodeActionService, NodeQueryService],
  exports: [],
})
export class NodesModule {}
