import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { jwtConstants } from './../constants'
import { RequestUser } from '../../shared/interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'myjwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any) {
    const requestUser: RequestUser = { userId: payload.sub, username: payload.username }

    return requestUser
  }
}
