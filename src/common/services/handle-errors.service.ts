import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class HandleErrorsService {
    private logger = new Logger(HandleErrorsService.name);

    private readonly ErrorsMapping = {
        products: {
            name: 'The product name must be unique',
        },
    };

    private readonly StatusMessages = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        409: 'Conflict',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error',
    };

    public handleError(error: any, context: string) {
        this.logger.error(error);

        if (error.code === 'P2002') {
            const field = error.meta?.target?.[0];
            const fieldMessage = this.ErrorsMapping[context]?.[field];

            throw new BadRequestException({
                message: fieldMessage ?? `Duplicate value for field '${field}'`,
                statusCode: 400,
                error: 'Bad Request',
            });
        }

        throw new InternalServerErrorException(error.message ?? 'Internal server error');
    }

    public throwRpcException(message: string, statusCode = 500): never {
        const errorType = this.StatusMessages[statusCode] ?? 'Unknown Error';

        throw new RpcException({
            message,
            statusCode,
            error: errorType,
        });
    }

}
