import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { SocketIoAdapter } from './socket.io.adapter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })
  app.enableCors({
    preflightContinue: true,
    optionsSuccessStatus: 200,
  })
  app.useWebSocketAdapter(new SocketIoAdapter(app, true))
  await app.listen(3000)
}

bootstrap()
