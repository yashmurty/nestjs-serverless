import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configModuleOptions } from '../shared/config/module-options'
import { LoggerModule } from './logger/logger.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from './interceptors/logging.interceptor'

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), LoggerModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
  exports: [ConfigModule, LoggerModule],
})
export class SharedModule {}
