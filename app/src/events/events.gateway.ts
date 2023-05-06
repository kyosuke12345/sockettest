import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  origin: '*',
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket): void {
    this.server.emit('events', {message: data, id: client.id })
  }
}