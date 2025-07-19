import { Product } from "generated/prisma";
import { CreateProductDto, PaginationProductDto, UpdateProductDto } from "src/products/dto";
import { FindAllResponse } from "../data/product.interface";

export interface IProductRepository {
    create(data: CreateProductDto) : Promise<Product>,
    findAll(filters: any, params: PaginationProductDto): Promise<FindAllResponse>
    find(term: Product['id'] | Product['name']): Promise<Product | null>
    update(id: Product['id'], data: Omit<UpdateProductDto, 'id'>) : Promise<Product>
    changeStatus(id: Product): Promise<Product>
}