import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsGateway } from './notification/notification.gateway';
import { RedisService } from './redis/redis.service';
import { InterServiceHandlerModule } from './inter-service-handler/inter-service-handler.module';
import { ObserverModule } from './observer/observer.module';

@Module({
  imports: [InterServiceHandlerModule, NotificationsGateway, ObserverModule],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule { }
