import { Module } from '@nestjs/common';
import { ItensPedidoHasItensAdicionaisService } from './itens-pedido-has-itens-adicionais.service';
import { ItensPedidoHasItensAdicionaisRepository } from './itens-pedido-has-itens-adicionais.repository';
import { PrismaService } from '../database/prisma.service';
import { ItensAdicionaisModule } from '../itens-adicionais/itens-adicionais.module';

@Module({
  imports: [ItensAdicionaisModule],
  controllers: [],
  providers: [
    ItensPedidoHasItensAdicionaisService,
    ItensPedidoHasItensAdicionaisRepository,
    PrismaService,
  ],
  exports: [ItensPedidoHasItensAdicionaisService],
})
export class ItensPedidoHasItensAdicionaisModule {}
