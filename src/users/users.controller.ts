import { Controller, Get, Request, UseGuards, NotFoundException } from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { RequestUser } from '../shared/interfaces'

@ApiTags('app')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getProfile(@Request() req) {
    const requestUser: RequestUser = req.user
    const user = await this.usersService.findOneByUsername(requestUser.username)
    if (!user) {
      throw new NotFoundException()
    }

    const { password, ...result } = user
    return result
  }
}
