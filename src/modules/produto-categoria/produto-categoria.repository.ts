import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProdutoCategoriaDto } from './dto/create-produto-categoria.dto';
import { DeleteProdutoCategoriaDto } from './dto/delete-produto-categoria.dto';

@Injectable()
export class ProdutoCategoriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProdutoCategoriaDto) {
    const { id_produto, id_categoria } = data;
    const createMany = id_categoria.map((id_categoria) => ({
      id_produto,
      id_categoria,
    }));
    return await this.prisma.produtoCategoria.createMany({ data: createMany });
  }

  async delete(data: DeleteProdutoCategoriaDto) {
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
