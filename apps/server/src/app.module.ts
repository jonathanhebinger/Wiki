import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IoModule } from './io/io.module'
import { NodesModule } from './nodes/nodes.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'brain',
      autoLoadEntities: true,
      synchronize: true,
      useUnifiedTopology: true,
      dropSchema: true,
    }),
    NodesModule,
    IoModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
