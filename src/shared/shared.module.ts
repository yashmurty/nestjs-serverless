import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configModuleOptions } from '../shared/config/module-options'

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)],
  exports: [ConfigModule],
})
export class SharedModule {}
