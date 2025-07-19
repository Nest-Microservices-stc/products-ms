import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Product } from 'generated/prisma';
import { IsUUID } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsUUID()
    id: Product['id'];
}
