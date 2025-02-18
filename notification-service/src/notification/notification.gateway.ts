import {
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ObserverService } from '../observer/observer.service';
import { RedisService } from '../redis/redis.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  redis: RedisService;

  observer: ObserverService;
  constructor() {
    this.observer = new ObserverService(this.redis);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    ObserverService.setServer(this.server);
    await this.observer.addClientToDb(client);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    await this.observer.removeClientFromDb(client);
  }
}
