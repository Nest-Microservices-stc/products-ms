import { Type } from 'class-transformer';
import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateProductDto {

    @IsString()
    @Length(3, 50)
    name: string;

    @IsNumber({ maxDecimalPlaces: 4 })
    @Type(() => Number)
    @Min(0)
    price: number;
}
