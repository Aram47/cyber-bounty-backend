import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { Server, Socket } from 'socket.io';

@Injectable()
export class ObserverService {
  private static server: Server = null;

  constructor(private readonly redis: RedisService) {}

  static setServer(server: Server) {
    ObserverService.server = server;
  }

  async addClientToDb(client: Socket) {
    const clientId = client.id;
    const userId = client.handshake.query.userId;
    if (userId) {
      await this.redis.setValue('users', userId.toString(), clientId);
    }
  }

  async addStatusToDb(userId: string) {
    await this.redis.setValue('status', userId, 'true');
  }

  async removeClientFromDb(client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId) {
      await this.redis.removeValue('users', userId.toString());
    }
  }

  async removeStatusFromDb(userId: string) {
    const res = this.redis.getValue('status', userId);
    if (res) {
      await this.redis.removeValue('status', userId.toString());
    }
  }

  async getFromDb(collection: string, userId: string): Promise<string | null> {
    return await this.redis.getValue(collection, userId.toString());
  }

  async sendMessageToUser(userId: string, message: string) {
    const clientId = await this.getFromDb('users', userId);

    if (clientId) {
      ObserverService.server.to(clientId).emit('message', message);
    }
  }
}
