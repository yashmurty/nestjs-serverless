import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { AppLogger } from '../logger/logger.service'
import { REQUEST_ID_TOKEN_HEADER } from '../constants'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private appLogger: AppLogger) {
    this.appLogger.setContext(AllExceptionsFilter.name)
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const requestID = request.headers[REQUEST_ID_TOKEN_HEADER]

    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const errorMessage = exception.getResponse() as HttpException

      const responseObject = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        url: request.url,
        ...errorMessage,
      }

      this.appLogger.warn({ status, requestID, responseObject })
      return response.status(status).json(responseObject)
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR
    const responseObject = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      url: request.url,
    }

    // Log the stack for non-HttpException errors
    if (exception instanceof Error) {
      this.appLogger.error(exception.message, exception.stack, exception.name)
      responseObject['error'] = exception.name
      responseObject['message'] = exception.message
    } else {
      this.appLogger.error(exception)
      responseObject['error'] = 'INTERNAL SERVER'
    }

    this.appLogger.warn({ status, requestID, responseObject })
    return response.status(status).json(responseObject)
  }
}
