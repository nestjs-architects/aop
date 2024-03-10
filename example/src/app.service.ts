import { Injectable } from '@nestjs/common';
import { ErrorHandling } from './error-handling.aspect';
import { Logging } from './logging.aspect';

@Injectable()
export class AppService {

  @Logging({format: 'TEXT'})
  @ErrorHandling()
  getHello(): string {
    console.log('Initial method called');
    return 'Hello World!';
  }

  @Logging({format: 'TEXT'})
  @ErrorHandling()
  error() {
    throw new Error('Test Error');
  }

}
