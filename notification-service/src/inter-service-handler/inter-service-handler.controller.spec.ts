import { Test, TestingModule } from '@nestjs/testing';
import { InterServiceHandlerController } from './inter-service-handler.controller';
import { InterServiceHandlerService } from './inter-service-handler.service';

describe('InterServiceHandlerController', () => {
  let controller: InterServiceHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterServiceHandlerController],
      providers: [InterServiceHandlerService],
    }).compile();

    controller = module.get<InterServiceHandlerController>(InterServiceHandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
