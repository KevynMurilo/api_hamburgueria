import { Module } from '@nestjs/common';
import { ItensDoPedidoService } from './itens-do-pedido.service';
import { ProdutoModule } from '../produto/produto.module';
import { ItensDoPedidoRepository } from './itens-do-pedido.repository';
import { PrismaService } from '../database/prisma.service';
import { ItensPedidoHasItensAdicionaisModule } from '../itens-pedido-has-itens-adicionais/itens-pedido-has-itens-adicionais.module';

@Module({
  imports: [ProdutoModule, ItensPedidoHasItensAdicionaisModule],
  controllers: [],
  providers: [ItensDoPedidoService, ItensDoPedidoRepository, PrismaService],
  exports: [ItensDoPedidoService],
})
export class ItensDoPedidoModule {}
