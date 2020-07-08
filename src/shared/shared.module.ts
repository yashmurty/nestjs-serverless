import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configModuleOptions } from '../shared/config/module-options'
import { LoggerModule } from './logger/logger.module'

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), LoggerModule],
  exports: [ConfigModule, LoggerModule],
})
export class SharedModule {}
