import { Module } from '@nestjs/common';
import { ProdutoCategoriaService } from './produto-categoria.service';
import { ProdutoCategoriaController } from './produto-categoria.controller';
import { ProdutoCategoriaRepository } from './produto-categoria.repository';
import { PrismaService } from '../database/prisma.service';
import { ProdutoModule } from '../produto/produto.module';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  imports: [ProdutoModule, CategoriaModule],
  controllers: [ProdutoCategoriaController],
  providers: [
    ProdutoCategoriaService,
    ProdutoCategoriaRepository,
    PrismaService,
  ],
})
export class ProdutoCategoriaModule {}
