import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { CategoriaRepository } from './categoria.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService, CategoriaRepository, PrismaService],
  exports: [CategoriaService],
})
export class CategoriaModule {}
