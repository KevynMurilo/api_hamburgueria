import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Categoria, Prisma } from '@prisma/client';

@Injectable()
export class CategoriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CategoriaCreateInput): Promise<Categoria> {
    return await this.prisma.categoria.create({
      data,
    });
  }

  async findAll(): Promise<Categoria[]> {
    return await this.prisma.categoria.findMany();
  }

  async findOne(id: number): Promise<Categoria> {
    return await this.prisma.categoria.findUnique({
      where: { id },
    });
  }

  async findByName(nome: string): Promise<Categoria> {
    return await this.prisma.categoria.findUnique({
      where: { nome },
    });
  }

  async update(id: number, nome: string): Promise<Categoria> {
    return await this.prisma.categoria.update({
      where: { id },
      data: {
        nome: nome,
      },
    });
  }

  async delete(id: number): Promise<Categoria> {
    return await this.prisma.categoria.delete({
      where: { id },
    });
  }
}
