import { Module } from '@nestjs/common';
import { ItensPedidoHasItensAdicionaisService } from './itens-pedido-has-itens-adicionais.service';
import { ItensPedidoHasItensAdicionaisController } from './itens-pedido-has-itens-adicionais.controller';
import { ItensPedidoHasItensAdicionaisRepository } from './itens-pedido-has-itens-adicionais.repository';
import { PrismaService } from '../database/prisma.service';
import { ItensDoPedidoModule } from '../itens-do-pedido/itens-do-pedido.module';
import { ItensAdicionaisModule } from '../itens-adicionais/itens-adicionais.module';

@Module({
  imports: [ItensDoPedidoModule, ItensAdicionaisModule],
  controllers: [ItensPedidoHasItensAdicionaisController],
  providers: [
    ItensPedidoHasItensAdicionaisService,
    ItensPedidoHasItensAdicionaisRepository,
    PrismaService,
  ],
})
export class ItensPedidoHasItensAdicionaisModule {}
