import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Pedido, Prisma } from '@prisma/client';
import { UpdatePedidosDto } from './dto/update-pedido.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';

const select = {
  id: true,
  numero_mesa: true,
  id_garcom: true,
  garcom: {
    select: {
      nome: true,
    },
  },
  hora_pedido: true,
  status: true,
  metodo_pagamento: true,
  itens: {
    select: {
      produto: {
        select: {
          nome: true,
          descricao: true,
          preco: true,
          produtoCategoria: {
            select: {
              categoria: {
                select: {
                  nome: true,
                },
              },
            },
          },
        },
      },
      itensAdicionais: {
        select: {
          itemAdicional: {
            select: {
              nome: true,
              descricao: true,
              preco: true,
            },
          },
        },
      },
      observacoes: true,
    },
  },
};
@Injectable()
export class PedidoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    trx: Prisma.TransactionClient,
    createPedidoDto: CreatePedidoDto,
  ): Promise<Pedido> {
    return await trx.pedido.create({
      data: {
        hora_pedido: new Date(),
        status: createPedidoDto.status,
        metodo_pagamento: createPedidoDto.metodo_pagamento,
        mesa: { connect: { numero: createPedidoDto.numero_mesa } },
        garcom: { connect: { id: createPedidoDto.id_garcom } },
      },
    });
  }

  async findAll(): Promise<Pedido[]> {
    return await this.prisma.pedido.findMany({
      select,
    });
  }

  async findOne(id: number): Promise<Pedido> {
    return await this.prisma.pedido.findUnique({
      where: { id },
      select,
    });
  }

  async findByPedidoMesaPendente(numero: number) {
    return await this.prisma.pedido.findMany({
      where: {
        numero_mesa: numero,
        status: 'pendente',
      },
      select,
    });
  }

  async updateMany(ids: number[], data: UpdatePedidosDto): Promise<number> {
    const result = await this.prisma.pedido.updateMany({
      where: { id: { in: ids } },
      data: {
        status: data.status,
        metodo_pagamento: data.metodo_pagamento,
      },
    });

    return result.count;
  }

  async delete(id: number): Promise<Pedido> {
    return await this.prisma.pedido.delete({
      where: { id },
    });
  }
}
