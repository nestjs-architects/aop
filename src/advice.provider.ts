export interface AdviceProvider<T = unknown> {
  attach(
    originalMethod: <T>(...args: unknown[]) => T,
    args: unknown[],
    options: unknown,
    // the object/service/provider that contains the method that is being replaced
    targetObject: Record<string, (arg: unknown) => Promise<unknown> | unknown>
  ): T;
}
