import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ItensPedidoHasItensAdicionaisDto } from './dto/itens-pedido-has-itens-adicionais.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItensPedidoHasItensAdicionaisRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    trx: Prisma.TransactionClient,
    data: ItensPedidoHasItensAdicionaisDto,
  ) {
    return await trx.itemDoPedidoItemAdicional.create({
      data: {
        itemDoPedido: { connect: { id: data.id_item_do_pedido } },
        itemAdicional: { connect: { id: data.id_item_adicional } },
      },
    });
  }

  async findOne(data: ItensPedidoHasItensAdicionaisDto) {
    const { id_item_do_pedido, id_item_adicional } = data;
    return await this.prisma.itemDoPedidoItemAdicional.findUnique({
      where: {
        id_item_do_pedido_id_item_adicional: {
          id_item_do_pedido,
          id_item_adicional,
        },
      },
    });
  }

  async delete(data: ItensPedidoHasItensAdicionaisDto) {
    const { id_item_do_pedido, id_item_adicional } = data;
    return await this.prisma.itemDoPedidoItemAdicional.delete({
      where: {
        id_item_do_pedido_id_item_adicional: {
          id_item_do_pedido,
          id_item_adicional,
        },
      },
    });
  }
}
