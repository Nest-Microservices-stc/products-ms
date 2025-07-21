import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HandleErrorsService } from 'src/common/services/handle-errors.service';
import { PaginationProductDto } from './dto';
import { FilterService } from './services/filter.service';
import { ProductRepository } from './repositories/product.repository';
import { Product } from 'generated/prisma';

@Injectable()
export class ProductsService {
  private readonly context = 'products';
  constructor(
    private readonly globalErrors: HandleErrorsService,
    private readonly filterService: FilterService,
    private readonly productRepository: ProductRepository
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.create(createProductDto);
    } catch (error) {
      this.globalErrors.handleError(error, this.context);
    }
  }

  async findAll(params: PaginationProductDto) {
    const fitlers = this.filterService.getFilter(params);
    const { data, totalPages } = await this.productRepository.findAll(fitlers, params);
    return {
      data,
      totalPages
    }
  }

  async findOne(term: Product['id'] | Product['name']) : Promise<Product> {
    const product = await this.productRepository.find(term);
    if (!product) this.globalErrors.throwRpcException('Product not found', 404);
    return product
  }

  async update(updateProductDto: UpdateProductDto) {
    await this.findOne(updateProductDto.id);
    const { id, ...data } = updateProductDto
    return await this.productRepository.update(id, data);
  }

  async remove(id: Product['id']) {
    const product = await this.findOne(id);
    return await this.productRepository.changeStatus(product);
  }
}
