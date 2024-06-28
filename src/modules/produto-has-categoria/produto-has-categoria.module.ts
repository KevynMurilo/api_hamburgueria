import { Module } from '@nestjs/common';
import { ProdutoHasCategoriaService } from './produto-has-categoria.service';
import { ProdutoHasCategoriaController } from './produto-has-categoria.controller';
import { ProdutoHasCategoriaRepository } from './produto-has-categoria.repository';
import { PrismaService } from '../database/prisma.service';
import { ProdutoModule } from '../produto/produto.module';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  imports: [ProdutoModule, CategoriaModule],
  controllers: [ProdutoHasCategoriaController],
  providers: [
    ProdutoHasCategoriaService,
    ProdutoHasCategoriaRepository,
    PrismaService,
  ],
})
export class ProdutoHasCategoriaModule {}
