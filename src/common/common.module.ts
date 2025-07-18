import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { HandleErrorsService } from './services/handle-errors.service';

@Module({
  providers: [PrismaService, HandleErrorsService],
  exports: [PrismaService, HandleErrorsService],
})
export class CommonModule {}
