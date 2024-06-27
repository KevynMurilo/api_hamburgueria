import { Module } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { PrismaService } from '../database/prisma.service';
import { MesaRepository } from './mesa.repository';
import { MesaController } from './mesa.controller';

@Module({
  providers: [MesaService, MesaRepository, PrismaService],
  controllers: [MesaController],
  exports: [MesaService],
})
export class MesaModule {}
