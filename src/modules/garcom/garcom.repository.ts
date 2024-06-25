import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Garcom, Prisma } from '@prisma/client';

@Injectable()
export class GarcomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.GarcomCreateInput): Promise<Garcom> {
    return await this.prisma.garcom.create({
      data,
    });
  }

  async findAll(): Promise<Garcom[]> {
    return await this.prisma.garcom.findMany();
  }

  async findOne(email: string): Promise<Garcom> {
    return await this.prisma.garcom.findUnique({
      where: { email },
    });
  }
}
