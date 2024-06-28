import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ItemAdicional, Prisma } from '@prisma/client';
import { UpdateItensAdicionaiDto } from './dto/update-itens-adicionai.dto';

@Injectable()
export class ItensAdicionaisRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ItemAdicionalCreateInput): Promise<ItemAdicional> {
    return await this.prisma.itemAdicional.create({
      data,
    });
  }

  async findAll(): Promise<ItemAdicional[]> {
    return await this.prisma.itemAdicional.findMany();
  }

  async findOne(id: number): Promise<ItemAdicional> {
    return await this.prisma.itemAdicional.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: UpdateItensAdicionaiDto,
  ): Promise<ItemAdicional> {
    return await this.prisma.itemAdicional.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<ItemAdicional> {
    return await this.prisma.itemAdicional.delete({
      where: { id },
    });
  }
}
