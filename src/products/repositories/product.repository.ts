import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateProductDto, PaginationProductDto, UpdateProductDto } from '../dto';
import { FindAllResponse } from '../interfaces/data/product.interface';
import { Product } from 'generated/prisma';
import { IProductRepository } from '../interfaces/class/product-repository.interface';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductRepository implements IProductRepository {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(data: CreateProductDto) : Promise<Product> {
        return await this.prisma.product.create({ data });
    }

    async findAll(filters: any, params: PaginationProductDto): Promise<FindAllResponse> {
        const { take = 10, skip = 0  } = params
        const [data, totalProducts] = await Promise.all([
            this.prisma.product.findMany({
                where: filters,
                take,
                skip
            }),
            this.prisma.product.count({ where: filters }),
        ]);

        return {
            data,
            totalPages: Math.ceil(totalProducts / take)
        };
    }

    async find(term: Product['id'] | Product['name']) : Promise<Product | null> {
        const isId = isUUID(term)
        return this.prisma.product.findUnique({
            where: isId ? { id: term } : { name: term },
        });
    }

    async update(id: Product['id'], data: UpdateProductDto ) : Promise<Product> {
        return await this.prisma.product.update({ where: { id }, data });
    }

    async changeStatus(product: Product) : Promise<Product> {
        return await this.prisma.product.update({ where: { id: product.id }, data: { availability: !product.availability } });
    }
    

}
