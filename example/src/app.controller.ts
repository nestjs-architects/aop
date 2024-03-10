import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logging } from './logging.aspect';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('error')
  error() {
    return this.appService.error();
  }
}
