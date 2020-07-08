import { Controller, Get, Request, UseGuards, NotFoundException } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'

@ApiTags('app')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getProfile(@Request() req) {
    const username = req.user.username
    const user = await this.usersService.findOne(username)
    if (!user) {
      throw new NotFoundException()
    }

    const { password, ...result } = user
    return result
  }
}
