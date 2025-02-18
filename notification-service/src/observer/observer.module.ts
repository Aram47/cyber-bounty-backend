import { Module } from '@nestjs/common';
import { ObserverController } from './observer.controller';
import { ObserverService } from '../observer/observer.service';
import { RedisService } from '../redis/redis.service';

@Module({
  controllers: [ObserverController],
  providers: [ObserverService, RedisService],
  exports: [ObserverService],
})
export class ObserverModule {}
