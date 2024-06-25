import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Mesa, Prisma } from '@prisma/client';

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
}
