import { Module } from '@nestjs/common';
import { AtendimentoExternoService } from './atendimento-externo.service';
import { PrismaService } from '../database/prisma.service';
import { AtendimentoExternoRepository } from './atendimento-externo.repository';
import { AtendimentoExternoController } from './atendimento-externo.controller';

@Module({
  providers: [
    AtendimentoExternoService,
    AtendimentoExternoRepository,
    PrismaService,
  ],
  controllers: [AtendimentoExternoController],
  exports: [AtendimentoExternoService],
})
export class AtendimentoExternoModule {}
