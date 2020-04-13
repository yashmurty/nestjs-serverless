import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CustomFirebaseLoginStrategy } from './strategies/custom-firebase-login.strategy'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
  ],
  providers: [AuthService, CustomFirebaseLoginStrategy],
  exports: [AuthService],
})
export class AuthModule {}
