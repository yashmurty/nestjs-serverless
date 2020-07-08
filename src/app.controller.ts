import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'
import { ConfigService } from '@nestjs/config'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private configService: ConfigService
  ) {}

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
}
