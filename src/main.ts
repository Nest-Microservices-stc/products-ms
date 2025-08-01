import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ParseTrimStringPipe } from './common/pipes/parse-trim-string.pipe';
import { envs } from './config/envs';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

async function bootstrap() {
  const logger = new Logger('MAIN');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      }
    },
  );

  app.useGlobalPipes(
    new ParseTrimStringPipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen();

  logger.log(`Products microservice running on port ${envs.port}`);
}
bootstrap();
