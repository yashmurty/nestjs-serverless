import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { CustomFirebaseLoginGuard } from './auth/guards/custom-firebase-login.guard'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
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

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @UseGuards(CustomFirebaseLoginGuard)
  @Post('auth/login/custom-firebase')
  async loginCustomFirebase(@Request() req) {
    return req.user
  }

  // TODO @yashmurty : Update this to be CustomFirebaseJWTGuard
  // @UseGuards(CustomFirebaseLoginGuard)
  // @Get('profile/custom-firebase')
  // getProfileCustomFirebase(@Request() req) {
  //   return req.user
  // }
}
