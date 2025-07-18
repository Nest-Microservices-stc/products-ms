import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsNumber()
    @IsIn([5, 10, 15])
    @Type(() => Number)
    take: number;
    
    @IsOptional()
    @IsNumber()
    @Min(-1)
    @Type(() => Number)
    skip: number;
}