import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { CreateProductDto, PaginationProductDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';
import { Product } from 'generated/prisma';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ValidateProductDto } from './dto/validate-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('createProduct')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern('findAllProducts')
  findAll(
    @Payload() params: PaginationProductDto
  ) {
    return this.productsService.findAll(params);
  }

  @MessagePattern('findOneProduct')
  findOne(
    @Payload('term') term: Product['id'] | Product['name']
  ) {
    return this.productsService.findOne(term);
  }

  @MessagePattern('updateProduct')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @MessagePattern('deleteProduct')
  remove(@Payload('id', ParseUUIDPipe) id: Product['id']) {
    return this.productsService.remove(id);
  }

  @MessagePattern('validateProducts')
  async validateProducts(
    @Payload() ids: ValidateProductDto
  ) {
    return await this.productsService.validateProducts(ids);
  }
}
