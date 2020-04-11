import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class CustomFirebaseLoginGuard extends AuthGuard('custom-firebase-login') {}
