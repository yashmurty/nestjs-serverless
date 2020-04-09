import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
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
    // get an environment variable
    const dbUser = this.configService.get<string>('DATABASE_USER')
    console.log('dbUser : ', dbUser)
    // get a custom configuration value
    const dbHost = this.configService.get<string>('database.host')
    console.log('dbHost : ', dbHost)

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
}
