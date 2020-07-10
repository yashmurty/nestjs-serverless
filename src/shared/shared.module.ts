import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configModuleOptions } from '../shared/config/module-options'
import { LoggerModule } from './logger/logger.module'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { AllExceptionsFilter } from './filters/all-exceptions.filter'
import { LoggingInterceptor } from './interceptors/logging.interceptor'

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), LoggerModule],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [ConfigModule, LoggerModule],
})
export class SharedModule {}
