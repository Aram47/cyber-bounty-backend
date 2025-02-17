import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@WebSocketGateway({ cors: true }) // Разрешаем CORS для фронтенда
export class NotificationGateway {
  @SubscribeMessage('message') // Ловим событие "message" от клиента
  @UseInterceptors(CacheInterceptor)
  @CacheKey('ws-events')
  @CacheTTL(0)
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Received message: ${data}`);
    client.emit('message', `Server received: ${data}`);
  }

  @SubscribeMessage('events')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('ws-events')
  @CacheTTL(10) // время жизни кэша в секундах (можно настроить или установить 0 для "без срока")
  handleEvent(@MessageBody() data: any) {
    // Здесь можно выполнять какую-либо логику и возвращать данные,
    // которые будут кэшироваться Redis (если ранее настроен CacheModule с Redis).
    return { event: 'events', data };
  }
}
