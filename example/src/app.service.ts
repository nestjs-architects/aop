import { Injectable } from '@nestjs/common';
import { ErrorHandling } from './error-handling.aspect';
import { Logging } from './logging.aspect';

@Injectable()
export class AppService {

  @Logging({format: 'JSON'})
  @ErrorHandling()
  getHello(): string {
    return 'Hello World!';
  }

  @Logging({format: 'TEXT'})
  @ErrorHandling()
  error() {
    throw new Error('Test Error');
  }

}
