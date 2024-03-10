import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { AdviceManager } from './advice.manager';
import { AdviceTypes, ADVICE_METADATA, TARGET_METADATA } from './decorators';

@Injectable()
export class AopExplorer implements OnModuleInit {
  constructor(
    private discoveryService: DiscoveryService,
    private manager: AdviceManager,
    private metadataScanner: MetadataScanner,
    private reflector: Reflector,
  ) {}

  onModuleInit(): void {
    this.explore();
  }

  explore(): void {
    const instanceWrappers: InstanceWrapper[] = this.discoveryService
      .getControllers()
      .concat(this.discoveryService.getProviders());

    instanceWrappers.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;

      if (!instance) {
        return;
      }

      // scanFromPrototype will iterate through all providers' methods
      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (methodName: string) => this.lookupProviderMethod(instance, methodName),
      );
    });

    this.manager.attachAll();
  }

  lookupProviderMethod(
    instance: Record<string, (arg: unknown) => Promise<void>>,
    methodName: string,
  ) {
    const methodRef = instance[methodName];
    const isTarget = this.reflector.get<string>(TARGET_METADATA, methodRef);
    const isAdvice = this.reflector.get<Record<string, AdviceTypes>>(
      ADVICE_METADATA,
      methodRef,
    );

    if (!isTarget && !isAdvice) {
      return;
    }

    if (isTarget) {
      this.manager.registerTarget(instance, methodName, isTarget);
    }

    if (isAdvice) {
      Object.keys(isAdvice).forEach((key) => {
        this.manager.registerAdvice(
          methodRef.bind(instance),
          key,
          isAdvice[key],
        );
      });
    }
  }
}
