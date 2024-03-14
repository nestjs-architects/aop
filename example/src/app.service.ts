import { AspectsApplier } from '@nestjs-architects/aop';
import { Injectable } from '@nestjs/common';
import { ErrorHandling } from './error-handling.aspect';
import { Logging } from './logging.aspect';
import { Speaker } from './speaker';

@Injectable()
export class AppService {
  constructor(private readonly aspectsApplier: AspectsApplier) {}

  @Logging({ format: 'TEXT' })
  @ErrorHandling()
  getHello(): string {
    console.log('Initial method called');
    return 'Hello World!';
  }

  @Logging({ format: 'TEXT' })
  @ErrorHandling()
  error() {
    throw new Error('Test Error');
  }

  speak() {
    const service = new Speaker();
    this.aspectsApplier.applyToProvider(service);
    service.speak();
  }
}
