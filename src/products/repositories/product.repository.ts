import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreateProductDto, PaginationProductDto, UpdateProductDto } from '../dto';
import { FindAllResponse } from '../interfaces/data/product.interface';
import { Product } from 'generated/prisma';
import { IProductRepository } from '../interfaces/class/product-repository.interface';
import { isUUID } from 'class-validator';
import { PaginationService } from 'src/common/services/pagination/pagination.service';

@Injectable()
export class ProductRepository implements IProductRepository {

    constructor(
        private readonly prisma: PrismaService,
        private readonly paginationService: PaginationService
    ) { }

    async create(data: CreateProductDto) : Promise<Product> {
        return await this.prisma.product.create({ data });
    }

    async findAll(filters: any, params: PaginationProductDto): Promise<FindAllResponse> {
        const { skip, take } = this.paginationService.getPagination(params.page, params.limit);
        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                where: filters,
                take,
                skip
            }),
            this.prisma.product.count({ where: filters }),
        ]);
        const meta = this.paginationService.buildMeta(total, skip, take);
        return {
            data,
            meta
        };
    }

    async find(term: Product['id'] | Product['name']) : Promise<Product | null> {
        const isId = isUUID(term)
        return this.prisma.product.findUnique({
            where: isId ? { id: term } : { name: term },
        });
    }

    async update(id: Product['id'], data: Omit<UpdateProductDto, 'id'> ) : Promise<Product> {
        return await this.prisma.product.update({ where: { id }, data });
    }

    async changeStatus(product: Product) : Promise<Product> {
        return await this.prisma.product.update({ where: { id: product.id }, data: { availability: !product.availability } });
    }
    
    async validateProducts(ids: string[]) {
        const products = await this.prisma.product.findMany({
            where: {
                id: { in: ids }
            }
        })
        return products
    }

}
