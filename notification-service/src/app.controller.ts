import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('set/:key/:value')
  // async setValue(@Param('key') key: string, @Param('value') value: string) {
  //   await this.appService.setValue(key, value);
  //   return `Key "${key}" set with value "${value}"`;
  // }

  // @Get('get/:key')
  // async getValue(@Param('key') key: string) {
  //   const value = await this.appService.getValue(key);
  //   return value ? `Value for "${key}" is "${value}"` : 'Key not found';
  // }
}
