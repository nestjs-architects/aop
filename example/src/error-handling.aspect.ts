import { AdviceProvider, AopModule, AspectsRegistry } from "@nestjs-architects/aop";
import { Module, SetMetadata } from "@nestjs/common";

const ERROR_HANDLING_KEY = 'ERROR_HANDLING';
export const ErrorHandling = () => SetMetadata(ERROR_HANDLING_KEY, true);

class ErrorHandlingAdvice implements AdviceProvider {
  async attach(originalMethod: Function, args: unknown[], _options: unknown): Promise<unknown> {
    try {
      return await originalMethod(...args);
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    }
  }
}


@Module({
  imports: [AopModule],
  providers: [ErrorHandlingAdvice],
})
export class ErrorHandlingModule {
  constructor(private readonly registry: AspectsRegistry, private readonly advice: ErrorHandlingAdvice) {
    this.registry.addAspect(ERROR_HANDLING_KEY, this.advice);
  }
}