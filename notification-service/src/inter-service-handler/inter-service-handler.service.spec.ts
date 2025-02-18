import { Test, TestingModule } from '@nestjs/testing';
import { InterServiceHandlerService } from './inter-service-handler.service';

describe('InterServiceHandlerService', () => {
  let service: InterServiceHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterServiceHandlerService],
    }).compile();

    service = module.get<InterServiceHandlerService>(InterServiceHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
