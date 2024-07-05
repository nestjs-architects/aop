import {
  AdviceProvider,
  AopModule,
  AspectsRegistry,
} from '@nestjs-architects/aop';
import { Injectable, Module, SetMetadata } from '@nestjs/common';

const LOGGING_KEY = 'LOGGING';
export const Logging = (options: LoggingOptions = { format: 'TEXT' }) =>
  SetMetadata(LOGGING_KEY, options);

interface LoggingOptions {
  format: 'JSON' | 'TEXT';
}

@Injectable()
class LoggingAdvice implements AdviceProvider {
  async attach(
    originalMethod: Function,
    args: unknown[],
    options: LoggingOptions,
    targetObject: Record<string, (arg: unknown) => Promise<unknown> | unknown>,
  ): Promise<unknown> {
    const originalMethodName = originalMethod.name.replace('bound ', '');
    const beforeMessage = `Before ${targetObject.constructor.name}.${originalMethodName}...`;
    console.log(
      options.format === 'JSON' ? { message: beforeMessage } : beforeMessage,
    );
    const result = await originalMethod(...args);
    const afterMessage = `After ${targetObject.constructor.name}.${originalMethodName}...`;
    console.log(
      options.format === 'JSON' ? { message: afterMessage } : afterMessage,
    );
    return result;
  }
}

@Module({
  imports: [AopModule],
  providers: [LoggingAdvice],
})
export class LoggingModule {
  constructor(
    private readonly registry: AspectsRegistry,
    private readonly loggingAdvice: LoggingAdvice,
  ) {
    this.registry.addAspect(LOGGING_KEY, this.loggingAdvice);
  }
}
