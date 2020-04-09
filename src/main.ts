import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const backendAppPort = configService.get('BACKEND_APP_PORT')

  const options = new DocumentBuilder()
    .setTitle('nestjs-serverless')
    .setDescription('SwaggerUI for nestjs-serverless API')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(backendAppPort)
}
bootstrap()
