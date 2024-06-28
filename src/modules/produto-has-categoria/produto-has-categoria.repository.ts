import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ProdutoCategoriaDto } from './dto/produto-categoria.dto';

@Injectable()
export class ProdutoHasCategoriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ProdutoCategoriaDto) {
    return await this.prisma.produtoCategoria.create({ data });
  }

  async findOne(data: ProdutoCategoriaDto) {
    const { id_produto, id_categoria } = data;
    return await this.prisma.produtoCategoria.findUnique({
      where: {
        id_produto_id_categoria: {
          id_produto,
          id_categoria,
        },
      },
    });
  }

  async delete(data: ProdutoCategoriaDto) {
    const { id_produto, id_categoria } = data;
    return await this.prisma.produtoCategoria.delete({
      where: {
        id_produto_id_categoria: {
          id_produto,
          id_categoria,
        },
      },
    });
  }
}
