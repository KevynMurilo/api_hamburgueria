import { Module } from '@nestjs/common';
import { ItensDoPedidoService } from './itens-do-pedido.service';
import { ProdutoModule } from '../produto/produto.module';
import { ItensDoPedidoRepository } from './itens-do-pedido.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [ProdutoModule],
  controllers: [],
  providers: [ItensDoPedidoService, ItensDoPedidoRepository, PrismaService],
  exports: [ItensDoPedidoService],
})
export class ItensDoPedidoModule {}
