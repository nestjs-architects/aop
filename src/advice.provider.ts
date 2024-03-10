export interface AdviceProvider {
  attach(originalMethod: Function, args: unknown[], options: unknown): unknown;
}
