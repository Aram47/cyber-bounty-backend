import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { createAdapter } from 'socket.io-redis';
// import { RedisClient } from 'redis';
// import { Observer } from './observer.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway {
  // @WebSocketServer()
  // server: Server;

  // private observer: Observer;

  constructor() {}

  // private setupRedisAdapter() {
  //   const pubClient = new RedisClient({ host: 'localhost', port: 6379 });
  //   const subClient = pubClient.duplicate();
  //   this.server.adapter(createAdapter({ pubClient, subClient }));
  // }

  // @SubscribeMessage('subscribe')
  // handleSubscription(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
  //   this.observer.subscribe(data.userId, client);
  // }

  // @SubscribeMessage('unsubscribe')
  // handleUnsubscription(@MessageBody() data: { userId: string }) {
  //   this.observer.unsubscribe(data.userId);
  // }

  // sendNotification(userId: string, message: string) {
  //   this.observer.notify(userId, message);
  // }
}
