import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class GlobalRcpService {
  private readonly logger = new Logger(GlobalRcpService.name);

  async execute<T>(obs$: Observable<T>): Promise<T> {
    try {
      const response = await firstValueFrom(obs$);
      this.logAndThrowIfError(response);
      return response;
    } catch (error) {
      throw this.handleCatch(error);
    }
  }

  private logAndThrowIfError<T>(response: T): void {
    if (
      response &&
      typeof response === 'object' &&
      'statusCode' in response &&
      typeof (response as any)['statusCode'] === 'number' &&
      (response as any)['statusCode'] >= 400
    ) {
      this.logger.warn('[MS Warning]', response);
      throw new RpcException(response);
    }
  }

  private handleCatch(error: any): RpcException {
    const rawMessage = error?.message || '';
    const cleanMessage =
      typeof rawMessage === 'string' && rawMessage.includes('(')
        ? rawMessage.substring(0, rawMessage.indexOf('(')).trim()
        : rawMessage || 'Internal server error (possibly MS not responding)';

    return new RpcException({
      message: `[MS Error]: ${cleanMessage}`,
      statusCode: 500,
    });
  }
}
