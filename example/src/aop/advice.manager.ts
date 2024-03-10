import { Injectable } from '@nestjs/common';
import { AdviceType, AdviceTypes, AttachedAdvices } from './decorators';

type UnknownMethod = (...args: unknown[]) => Promise<void>;

@Injectable()
export class AdviceManager {
  private registry: Record<
    string,
    Record<keyof AttachedAdvices, UnknownMethod[]> & {
      target: { instance: object; methodName: string }[];
    }
  > = {};

  attachAll(): void {
    Object.keys(this.registry).forEach((key) => {
      const targetAndAdvice = this.registry[key];
      if (!targetAndAdvice.target) return;

      targetAndAdvice.target.forEach(({ instance, methodName }) => {
        const originalMethod = instance[methodName];

        for (const around of targetAndAdvice.around) {
          instance[methodName] = around(instance[methodName]);
        }

        instance[methodName] = async (...args: unknown[]) => {
          try {
            for (const before of targetAndAdvice.before) {
              await before(...args);
            }
            const result = await originalMethod.apply(instance, args);
            for (const after of targetAndAdvice.after) {
              await after(...args, result);
            }
            return result;
          } catch (e) {
            for (const catchError of targetAndAdvice.catch) {
              await catchError(...args, e);
            }
            throw e;
          } finally {
            for (const finalize of targetAndAdvice.finally) {
              await finalize(...args);
            }
          }
        };
      });
    });
  }

  private addKey(key: string): void {
    if (!this.registry[key]) {
      this.registry[key] = {
        target: [],
        before: [],
        after: [],
        catch: [],
        around: [],
        finally: [],
      };
    }
  }
  registerAdvice(
    methodRef: (arg: unknown) => Promise<void>,
    key: string,
    adviceTypes: AdviceTypes,
  ) {
    this.addKey(key);
    adviceTypes.forEach((type: AdviceType) => {
      this.registry[key][type].push(methodRef);
    });
  }

  registerTarget(instance: object, methodName: string, key: string): void {
    this.addKey(key);
    this.registry[key].target.push({ instance, methodName });
  }
}
