import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './produto.repository';
import { PrismaService } from '../database/prisma.service';
import { ProdutoHasCategoriaModule } from '../produto-has-categoria/produto-has-categoria.module';

@Module({
  imports: [ProdutoHasCategoriaModule],
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoRepository, PrismaService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
