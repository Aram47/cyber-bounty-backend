import { Module } from '@nestjs/common';
import { InterServiceHandlerService } from './inter-service-handler.service';
import { InterServiceHandlerController } from './inter-service-handler.controller';
import { ObserverModule } from '../observer/observer.module';

@Module({
  imports: [ObserverModule],
  controllers: [InterServiceHandlerController],
  providers: [InterServiceHandlerService],
})
export class InterServiceHandlerModule {}
