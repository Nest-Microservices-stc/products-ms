import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { SeedData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async executeSeed() {
    await this.prisma.product.deleteMany({});
    await this.prisma.product.createMany({ data: SeedData });
    return `This action returns all seed`;
  }
}
