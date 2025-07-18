import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class HandleErrorsService {
    private logger = new Logger(HandleErrorsService.name);

    private readonly ErrorsMapping = {
        auth: {
            email: 'This email is already in use',
        },
        cars: {
            slug: 'The slug must be unique, please change model, year or brand',
        },
        products: {
            name: 'The product name must be unique',
        },
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
}
