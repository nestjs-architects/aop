import { Injectable } from '@nestjs/common';
import { AdviceProvider } from './advice.provider';

@Injectable()
export class AspectsRegistry {
  private registry: Map<string | symbol, AdviceProvider> = new Map();

  public getAll(): [string | symbol, AdviceProvider][] {
    return [...this.registry.entries()];
  }

  public addAspect(key: string | symbol, provider: AdviceProvider): void {
    if (this.registry.has(key)) {
      throw new Error(`Aspect with key ${String(key)} already exists`);
    }
    this.registry.set(key, provider);
  }
}
