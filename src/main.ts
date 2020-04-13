import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
const serviceAccount = require('../serviceAccountKey.json')
import * as firebaseAdmin from 'firebase-admin'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const backendAppPort = configService.get('BACKEND_APP_PORT')
  const firebaseDatabaseURL = configService.get('FIREBASE_DATABASE_URL')

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: firebaseDatabaseURL,
  })

  const options = new DocumentBuilder()
    .setTitle('nestjs-serverless')
    .setDescription('SwaggerUI for nestjs-serverless API')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(backendAppPort)
}
bootstrap()
