import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ItemDoPedido, Prisma } from '@prisma/client';
import { CreateItensDoPedidoDto } from './dto/create-itens-do-pedido.dto';

@Injectable()
export class ItensDoPedidoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateItensDoPedidoDto): Promise<ItemDoPedido> {
    return await this.prisma.itemDoPedido.create({
      data: {
        pedido: { connect: { id: data.id_pedido } },
        produto: { connect: { id: data.id_produto } },
        quantidade: data.quantidade,
        observacoes: data.observacoes,
      },
    });
  }

  async findAll(): Promise<ItemDoPedido[]> {
    return await this.prisma.itemDoPedido.findMany();
  }

  async findOne(id: number): Promise<ItemDoPedido> {
    return await this.prisma.itemDoPedido.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: Prisma.ItemDoPedidoUpdateInput,
  ): Promise<ItemDoPedido> {
    return await this.prisma.itemDoPedido.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<ItemDoPedido> {
    return await this.prisma.itemDoPedido.delete({
      where: { id },
    });
  }
}
