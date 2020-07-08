import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiNoContentResponse,
} from '@nestjs/swagger'

@Controller('auth')
export class AuthController {}
