import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { ConfigService } from '@nestjs/config'

import { SNS, AWSError } from 'aws-sdk'

@Controller()
export class AppController {
  private readonly awsSNS: SNS

  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private configService: ConfigService
  ) {
    // TODO @yashmurty : Move all the SNS code to a awsSDK module/file.
    this.awsSNS = new SNS({
      apiVersion: '2010-03-31',
      region: this.configService.get<string>('AWS_SNS_REGION'),
    })
  }

  @Get()
  async getHello(): Promise<string> {
    console.log('WIP - getHello function')
    // TODO @yashmurty : This trying out how to get env vars. Remove this later.
    const dbUser = this.configService.get<string>('DATABASE_USER')
    console.log('dbUser : ', dbUser)

    // TODO @yashmurty : Move all the SNS code to a awsSDK module/file.
    const getParams = {
      attributes: ['DefaultSMSType'],
    }

    await this.awsSNS
      .getSMSAttributes(getParams)
      .promise()
      .then((data: SNS.Types.GetSMSAttributesResponse) => {
        console.log('GetSMSAttributesResponse : ', data)
        return data
      })
      .catch((err: AWSError) => {
        console.log('err : ', err)
        throw err
      })

    var setParams = {
      attributes: {
        /* required */
        DefaultSMSType: 'Transactional' /* highest reliability */,
        //'DefaultSMSType': 'Promotional' /* lowest cost */
      },
    }

    await this.awsSNS
      .setSMSAttributes(setParams)
      .promise()
      .then((data: SNS.Types.SetSMSAttributesResponse) => {
        console.log('SetSMSAttributesResponse : ', data)
        return data
      })
      .catch((err: AWSError) => {
        console.log('err : ', err)
        throw err
      })

    // Create publish parameters
    var sendParams = {
      Message: 'Test text message via SNS' /* required */,
      PhoneNumber: '+817044423937',
    }

    await this.awsSNS
      .publish(sendParams)
      .promise()
      .then((data: SNS.Types.PublishResponse) => {
        console.log('PublishResponse : ', data)
        return data
      })
      .catch((err: AWSError) => {
        console.log('err : ', err)
        throw err
      })

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
