import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private static client: Redis = null;
  constructor() {
    if (RedisService.client === null) {
      RedisService.client = new Redis({
        host: 'localhost',
        port: 6379,
      });
      RedisService.client.connect(() => {
        console.log('Redis connected');
      });

      RedisService.client.set('users', JSON.stringify({})); // { userId: userId }

      RedisService.client.set('status', JSON.stringify({})); // { userId: true | false }
    }
  }

  async setValue(
    collection: string,
    key: string,
    value: string | null,
  ): Promise<object> {
    const res = JSON.parse(await RedisService.client.get(collection));
    res[key] = value;
    RedisService.client.set(collection, JSON.stringify(res));
    return res;
  }

  async getValue(collection: string, key: string): Promise<string | null> {
    const status = JSON.parse(await RedisService.client.get(collection));
    if (status[key]) {
      return status[key];
    }
    return null;
  }

  async removeValue(collection: string, key: string) {
    const res = JSON.parse(await RedisService.client.get(collection));
    if (res[key]) {
      delete res[key];
      RedisService.client.set(collection, JSON.stringify(res));
    }
  }

  onModuleDestroy() {
    RedisService.client.quit();
  }
}
