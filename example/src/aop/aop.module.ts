import { Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AdviceManager } from './advice.manager';
import { AopExplorer } from './aop.explorer';

@Module({
  imports: [DiscoveryModule],
  providers: [AopExplorer, AdviceManager],
})
export class AopModule {}
