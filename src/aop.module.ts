import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { AspectsApplier } from './aspects-applier';
import { AspectsRegistry } from './aspects.registry';

@Module({
  imports: [DiscoveryModule],
  providers: [AspectsApplier, AspectsRegistry],
  exports: [AspectsApplier, AspectsRegistry],
})
export class AopModule {}
