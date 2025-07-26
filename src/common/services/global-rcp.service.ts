import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class GlobalRcpService {
  private logger = new Logger(GlobalRcpService.name);

  async execute<T>(obs$: Observable<T>): Promise<T> {
    try {
      const response = await firstValueFrom(obs$);

      if (
        response &&
        typeof response === 'object' &&
        'statusCode' in response &&
        typeof (response as any)['statusCode'] === 'number' &&
        (response as any)['statusCode'] >= 400
      ) {
        this.logger.warn('[MS Warning]: Error enviado como respuesta normal', response);
        throw new RpcException(response);
      }

      return response;
    } catch (error) {
  if (error.code === 'ECONNRESET') {
    this.logger.error('[MS Error]: Conexión rechazada o reiniciada (ECONNRESET)');
  } else {
    this.logger.error('[MS Error]: Excepción lanzada', error);
  }

  throw new RpcException({
    message:
      error?.message?.length > 0
        ? error.message
        : 'Internal server error (possibly MS not responding)',
    statusCode: 500,
  });
}

  }
}
