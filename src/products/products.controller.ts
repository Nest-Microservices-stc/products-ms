import { Controller, Param, Query } from '@nestjs/common';
import { CreateProductDto, PaginationProductDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';
import { Product } from 'generated/prisma';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern('create_product')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern('find_all_products')
  findAll(
    @Payload() params: PaginationProductDto
  ) {
    return this.productsService.findAll(params);
  }

  // @Get(':term')
  @MessagePattern('find_one_product')
  findOne(@Payload('term') term: Product['id'] | Product['name']) {
    return this.productsService.findOne(term);
  }

  // @Patch(':id')
  @MessagePattern('update_product')
  update(@Param('id') id: Product['id'], @Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern('delete_product')
  remove(@Param('id') id: Product['id']) {
    console.log(id);
    return this.productsService.remove(id);
  }
}
