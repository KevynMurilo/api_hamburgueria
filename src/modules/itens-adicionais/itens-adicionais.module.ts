import { Module } from '@nestjs/common';
import { ItensAdicionaisService } from './itens-adicionais.service';
import { ItensAdicionaisController } from './itens-adicionais.controller';
import { ItensAdicionaisRepository } from './itens-adicionais.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [ItensAdicionaisController],
  providers: [ItensAdicionaisService, ItensAdicionaisRepository, PrismaService],
  exports: [ItensAdicionaisService],
})
export class ItensAdicionaisModule {}
