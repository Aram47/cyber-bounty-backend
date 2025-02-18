import { Controller } from '@nestjs/common';
import { ObserverService } from './observer.service';

@Controller('observer')
export class ObserverController {
  constructor(private readonly observerService: ObserverService) {}
}
