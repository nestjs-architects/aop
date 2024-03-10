import 'reflect-metadata';

export const ADVICE_METADATA = '__aop-advice__';
export const TARGET_METADATA = '__aop-target__';

export type AdviceType = 'before' | 'after' | 'catch' | 'around' | 'finally';
export type AdviceTypes = AdviceType[];

export interface AttachedAdvices {
  before: Function[];
  after: Function[];
  catch: Function[];
  around: Function[];
  finally: Function[];
}

const addAdviceMetadata = (target: object) =>
  !Reflect.hasMetadata(ADVICE_METADATA, target) &&
  Reflect.defineMetadata(ADVICE_METADATA, {}, target);

const addAddviceMetadataForKey = (target: object, key: string) => {
  addAdviceMetadata(target);
  const advice = Reflect.getMetadata(ADVICE_METADATA, target);
  if (!advice[key]) {
    advice[key] = [];
  }
};

export const Before = (key: string): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    addAddviceMetadataForKey(target[propertyKey], key);
    (Reflect.getMetadata(ADVICE_METADATA, target[propertyKey]) as AdviceTypes)[
      key
    ].push('before');
  };
};

export const Before = (key: string): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    addAddviceMetadataForKey(target[propertyKey], key);
    (Reflect.getMetadata(ADVICE_METADATA, target[propertyKey]) as AdviceTypes)[
      key
    ].push('before');
  };
};

export const After = (key: string): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    addAddviceMetadataForKey(target[propertyKey], key);
    (Reflect.getMetadata(ADVICE_METADATA, target[propertyKey]) as AdviceTypes)[
      key
    ].push('after');
  };
};

export const Around = (key: string): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    addAddviceMetadataForKey(target[propertyKey], key);
    (Reflect.getMetadata(ADVICE_METADATA, target[propertyKey]) as AdviceTypes)[
      key
    ].push('around');
  };
};

export const catch = (key: string): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    addAddviceMetadataForKey(target[propertyKey], key);
    (Reflect.getMetadata(ADVICE_METADATA, target[propertyKey]) as AdviceTypes)[
      key
    ].push('before');
  };
};

export const Target = (key: string): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    if (!Reflect.hasMetadata(TARGET_METADATA, target[propertyKey])) {
      return Reflect.defineMetadata(
        TARGET_METADATA,
        [key],
        target[propertyKey],
      );
    }
    const keys: string[] = Reflect.getMetadata(
      TARGET_METADATA,
      target[propertyKey],
    );
    keys.push(key);
  };
};
