import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { FirebaseNormalUserLoginGuard } from './auth/guards/firebase-normal-user-login.guard'
import { FirebaseNormalUserValidateGuard } from './auth/guards/firebase-normal-user-validate.guard'
import { AuthService } from './auth/auth.service'
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @Get()
  getHello(): string {
    console.log('WIP - getHello function')
    // TODO @yashmurty : This trying out how to get env vars. Remove this later.
    const dbUser = this.configService.get<string>('DATABASE_USER')
    console.log('dbUser : ', dbUser)

    return this.appService.getHello()
  }

  @UseGuards(FirebaseNormalUserLoginGuard)
  @Post('auth/login')
  async loginFirebase(@Request() req) {
    return req.user
  }

  @UseGuards(FirebaseNormalUserValidateGuard)
  @Get('profile')
  getProfileFirebase(@Request() req) {
    return req.user
  }
}
