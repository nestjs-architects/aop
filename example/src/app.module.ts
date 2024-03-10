import { Module } from '@nestjs/common';
import { AopModule } from './aop/aop.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeforeSample } from './before-sample';

@Module({
  imports: [AopModule],
  controllers: [AppController],
  providers: [AppService, BeforeSample],
})
export class AppModule {}
