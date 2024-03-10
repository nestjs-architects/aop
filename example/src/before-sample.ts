import { Injectable } from '@nestjs/common';
import { Before } from './aop/decorators';
import { AppService } from './app.service';

@Injectable()
export class BeforeSample {
  constructor(private readonly appService: AppService) {}

  @Before('SAMPLE')
  beforeSample() {
    console.log(this.appService.getSomething());
  }
}
