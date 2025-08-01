import { Module } from '@nestjs/common';
import { ProductModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ProductModule, CommonModule, SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
