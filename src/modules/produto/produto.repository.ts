import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma, Produto } from '@prisma/client';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ProdutoCreateInput): Promise<Produto> {
    return await this.prisma.produto.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
      },
    });
  }

  async findAll() {
    return await this.prisma.produto.findMany({
      select: {
        id: true,
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
    });
  }

  async findByCategory(id: number) {
    return await this.prisma.categoria.findMany({
      where: { id },
      select: {
        nome: true,
        produtoCategoria: {
          include: {
            produto: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });
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
