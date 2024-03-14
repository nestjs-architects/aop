import { AopModule } from '@nestjs-architects/aop';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorHandlingModule } from './error-handling.aspect';
import { LoggingModule } from './logging.aspect';

@Module({
  imports: [AopModule, LoggingModule, ErrorHandlingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
