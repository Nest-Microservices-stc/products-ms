import { ArrayMinSize, IsArray, IsUUID } from "class-validator";
import { Product } from "generated/prisma";

export class ValidateProductDto {

    @IsArray()
    @ArrayMinSize(1)
    @IsUUID('all', { each: true })
    ids: Product['id'][]
}