import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PedidoRepository } from './pedido.repository';
import { PrismaService } from '../database/prisma.service';
import { MesaModule } from '../mesa/mesa.module';
import { GarcomModule } from '../garcom/garcom.module';
import { ItensDoPedidoModule } from '../itens-do-pedido/itens-do-pedido.module';
import { ItensPedidoHasItensAdicionaisModule } from '../itens-pedido-has-itens-adicionais/itens-pedido-has-itens-adicionais.module';
import { PrintTcpModule } from '../print-tcp/print-tcp.module';
import { ProdutoModule } from '../produto/produto.module';
import { ItensAdicionaisModule } from '../itens-adicionais/itens-adicionais.module';
import { AtendimentoExternoModule } from '../atendimento-externo/atendimento-externo.module';

@Module({
  imports: [
    MesaModule,
    AtendimentoExternoModule,
    GarcomModule,
    ProdutoModule,
    ItensAdicionaisModule,
    ItensDoPedidoModule,
    ItensPedidoHasItensAdicionaisModule,
    PrintTcpModule,
  ],
  controllers: [PedidoController],
  providers: [PedidoService, PedidoRepository, PrismaService],
  exports: [PedidoService],
})
export class PedidoModule {}
