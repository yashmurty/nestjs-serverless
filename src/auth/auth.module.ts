import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { FirebaseNormalUserLoginStrategy } from './strategies/firebase-normal-user-login.strategy'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule],
  providers: [AuthService, FirebaseNormalUserLoginStrategy],
  exports: [AuthService],
})
export class AuthModule {}
