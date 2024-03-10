import { AdviceProvider, AopModule, AspectsRegistry } from "@nestjs-architects/aop";
import { Module, SetMetadata } from "@nestjs/common";

const LOGGING_KEY = 'LOGGING';
export const Logging = (options: LoggingOptions) => SetMetadata(LOGGING_KEY, options);

interface LoggingOptions {
  format: 'JSON' | 'TEXT';
}

class LoggingAdvice implements AdviceProvider {
  async attach(originalMethod: Function, args: unknown[], options: LoggingOptions): Promise<unknown> {
    console.log(options.format === 'JSON' ? {message: 'Before...'}  : 'Before...');
    const result = await originalMethod(...args);
    console.log(options.format === 'JSON' ? {message: 'After...'}  : 'After...');
    return result;
  }
}


@Module({
  imports: [AopModule],
  providers: [LoggingAdvice],
})
export class LoggingModule {
  constructor(private readonly registry: AspectsRegistry, private readonly loggingAdvice: LoggingAdvice) {
    this.registry.addAspect(LOGGING_KEY, this.loggingAdvice);
  }
}