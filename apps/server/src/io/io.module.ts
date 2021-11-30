import { Module } from '@nestjs/common'

import { IoGateway } from './io.gateway'

@Module({
  providers: [IoGateway],
  exports: [IoGateway],
})
export class IoModule {}
