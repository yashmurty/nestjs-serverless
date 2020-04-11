import { Strategy, VerifiedCallback } from 'passport-custom'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExtractJwt } from 'passport-jwt'
import { Request } from 'express'

@Injectable()
export class CustomFirebaseLoginStrategy extends PassportStrategy(
  Strategy,
  'custom-firebase-login'
) {
  async validate(req: Request, done: VerifiedCallback): Promise<any> {
    const extractorFunction = ExtractJwt.fromAuthHeaderAsBearerToken()
    const token = extractorFunction(req)
    console.log('token : ', token)

    if (!token) {
      throw new UnauthorizedException('No bearer token found in the header')
    }

    done(null, { userId: 'sub', username: 'username' })
  }
}
