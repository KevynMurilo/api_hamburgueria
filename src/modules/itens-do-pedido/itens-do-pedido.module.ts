import { Module } from '@nestjs/common';
import { ItensDoPedidoService } from './itens-do-pedido.service';
import { ItensDoPedidoController } from './itens-do-pedido.controller';
import { PedidoModule } from '../pedido/pedido.module';
import { ProdutoModule } from '../produto/produto.module';
import { ItensDoPedidoRepository } from './itens-do-pedido.repository';
import { PrismaService } from '../database/prisma.service';

@Module({
  imports: [PedidoModule, ProdutoModule],
  controllers: [ItensDoPedidoController],
  providers: [ItensDoPedidoService, ItensDoPedidoRepository, PrismaService],
})
export class ItensDoPedidoModule {}
