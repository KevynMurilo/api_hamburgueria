import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Externo, Prisma } from '@prisma/client';
import { UpdateAtendimentoExternoDto } from './dto/update-atendimento-externo.dto';

@Injectable()
export class AtendimentoExternoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(trx: Prisma.TransactionClient, nome: string): Promise<Externo> {
    return await trx.externo.create({
      data: {
        nome_cliente: nome,
      },
    });
  }

  async findAll(): Promise<Externo[]> {
    return await this.prisma.externo.findMany();
  }

  async findOne(id: number): Promise<Externo> {
    return await this.prisma.externo.findUnique({
      where: { id: id },
    });
  }

  async update(
    id: number,
    updateAtendimentoExternoDto: UpdateAtendimentoExternoDto,
  ): Promise<Externo> {
    return await this.prisma.externo.update({
      where: { id },
      data: {
        status: updateAtendimentoExternoDto.status,
      },
    });
  }

  async delete(id: number): Promise<Externo> {
    return await this.prisma.externo.delete({
      where: { id },
    });
  }
}
