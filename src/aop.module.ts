import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AopExplorer } from './aop.explorer';
import { AspectsRegistry } from './aspects.registry';

@Module({
  imports: [DiscoveryModule],
  providers: [AopExplorer, AspectsRegistry],
  exports: [AspectsRegistry],
})
export class AopModule {}
