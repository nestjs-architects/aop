import { Injectable } from '@nestjs/common';
import { Target } from './aop/decorators';

@Injectable()
export class AppService {
  @Target('SAMPLE')
  getHello(): string {
    return 'Hello World!';
  }

  getSomething() {
    return 'something';
  }
}
