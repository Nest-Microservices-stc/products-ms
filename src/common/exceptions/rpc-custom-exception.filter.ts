import { Catch, ArgumentsHost, ExceptionFilter, Logger, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcCustomExceptionFilter.name);

  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError();

    if (typeof error === 'object' && error !== null) {
      const statusCode = (error as any).statusCode || HttpStatus.BAD_REQUEST;
      const message = (error as any).message || 'Bad Request';

      this.logger.warn(`[MS RpcException]: ${statusCode} - ${message}`, error);

      return {
        statusCode,
        message,
        ...error,
      };
    }

    this.logger.error(`[MS RpcException]: ${String(error)}`);

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: String(error),
    };
  }
}
