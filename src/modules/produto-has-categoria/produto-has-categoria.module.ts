import { Module } from '@nestjs/common';
import { ProdutoHasCategoriaService } from './produto-has-categoria.service';
import { ProdutoHasCategoriaController } from './produto-has-categoria.controller';
import { ProdutoHasCategoriaRepository } from './produto-has-categoria.repository';
import { PrismaService } from '../database/prisma.service';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  imports: [CategoriaModule],
  controllers: [ProdutoHasCategoriaController],
  providers: [
    ProdutoHasCategoriaService,
    ProdutoHasCategoriaRepository,
    PrismaService,
  ],
  exports: [ProdutoHasCategoriaService],
})
export class ProdutoHasCategoriaModule {}
