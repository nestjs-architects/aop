export interface AdviceProvider<T = unknown> {
  attach(
    originalMethod: <T>(...args: unknown[]) => T,
    args: unknown[],
    options: unknown
  ): T;
}
