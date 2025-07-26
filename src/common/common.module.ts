import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { HandleErrorsService } from './services/handle-errors.service';
import { PaginationService } from './services/pagination.service';
import { GlobalRcpService } from './services/global-rcp.service';

@Module({
  providers: [PrismaService, HandleErrorsService, PaginationService, GlobalRcpService],
  exports: [PrismaService, HandleErrorsService, PaginationService, GlobalRcpService],
})
export class CommonModule {}
