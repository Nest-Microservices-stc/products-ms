import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CommonModule } from 'src/common/common.module';
import { FilterService } from './services/filter.service';
import { ProductRepository } from './repositories/product.repository';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [CommonModule, NatsModule],
  controllers: [ProductsController],
  providers: [ProductsService, FilterService, ProductRepository],
})
export class ProductModule {}
