import { Controller, Get, Param } from '@nestjs/common';
import { InterServiceHandlerService } from './inter-service-handler.service';
@Controller('inter-service-handler')
export class InterServiceHandlerController {
  constructor(
    private readonly interServiceHandlerService: InterServiceHandlerService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.interServiceHandlerService.findOne(id);
  }
}
