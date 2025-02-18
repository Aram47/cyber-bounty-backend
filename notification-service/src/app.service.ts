import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  // async setValue(key: string, value: string): Promise<void> {
  //   await this.redisService.setValue(key, value);
  // }

  // async getValue(key: string): Promise<string | null> {
  //   return this.redisService.getValue(key);
  // }
}
