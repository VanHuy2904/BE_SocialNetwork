import { Module } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { MyGateway } from './gateway';

@Module({
  providers: [MyGateway],
})
export class GatewayModule extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const optionsWithCors: ServerOptions = {
      ...options,
      cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    };
    return super.createIOServer(port, optionsWithCors);
  }
}
