import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Mesa, Prisma } from '@prisma/client';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Injectable()
export class MesaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MesaCreateInput): Promise<Mesa> {
    return await this.prisma.mesa.create({
      data,
    });
  }

  async findAll(): Promise<Mesa[]> {
    return await this.prisma.mesa.findMany();
  }

  async findOne(numero: number): Promise<Mesa> {
    return await this.prisma.mesa.findUnique({
      where: { numero: numero },
    });
  }

  async update(
    numero: number,
    updateMesaDto: UpdateMesaDto,
    trx?: Prisma.TransactionClient,
  ): Promise<Mesa> {
    const prismaClient = trx || this.prisma;
    return await prismaClient.mesa.update({
      where: { numero },
      data: {
        status: updateMesaDto.status,
      },
    });
  }

  async delete(numero: number): Promise<Mesa> {
    return await this.prisma.mesa.delete({
      where: { numero },
    });
  }
}
