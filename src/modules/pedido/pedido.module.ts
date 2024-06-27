import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PedidoRepository } from './pedido.repository';
import { PrismaService } from '../database/prisma.service';
import { MesaModule } from '../mesa/mesa.module';
import { GarcomModule } from '../garcom/garcom.module';

@Module({
  imports: [MesaModule, GarcomModule],
  controllers: [PedidoController],
  providers: [PedidoService, PedidoRepository, PrismaService],
  exports: [PedidoService],
})
export class PedidoModule {}
