import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class PaginationProductDto extends PaginationDto {
    @IsOptional()
    @IsString()
    @MaxLength(20)
    search: string

    @IsOptional()
    @IsNumber()
    @Min(-1)
    @Type(() => Number)
    minPrice: number

    @IsOptional()
    @IsNumber()
    @Min(-1)
    @Type(() => Number)
    maxPrice: number
}