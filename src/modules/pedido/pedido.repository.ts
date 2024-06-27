import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Pedido } from '@prisma/client';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Injectable()
export class PedidoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return await this.prisma.pedido.create({
      data: {
        hora_pedido: new Date(),
        status: createPedidoDto.status,
        mesa: { connect: { numero: createPedidoDto.numero_mesa } },
        garcom: { connect: { id: createPedidoDto.id_garcom } },
      },
    });
  }

  async findAll(): Promise<Pedido[]> {
    return await this.prisma.pedido.findMany();
  }

  async findOne(id: number): Promise<Pedido> {
    return await this.prisma.pedido.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdatePedidoDto): Promise<Pedido> {
    return await this.prisma.pedido.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Pedido> {
    return await this.prisma.pedido.delete({
      where: { id },
    });
  }
}
