import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, Produto } from '@prisma/client';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProdutoCreateInput): Promise<Produto> {
    return await this.prisma.produto.create({
      data,
    });
  }

  async findAll(): Promise<Produto[]> {
    return await this.prisma.produto.findMany();
  }

  async findOne(id: number): Promise<Produto> {
    return await this.prisma.produto.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateProdutoDto): Promise<Produto> {
    return await this.prisma.produto.update({
      where: { id },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
      },
    });
  }

  async delete(id: number): Promise<Produto> {
    return await this.prisma.produto.delete({
      where: { id },
    });
  }
}
