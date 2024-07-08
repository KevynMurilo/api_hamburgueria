import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoRepository } from './produto.repository';
import { ProdutoHasCategoriaService } from '../produto-has-categoria/produto-has-categoria.service';

@Injectable()
export class ProdutoService {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly produtoHasCategoriaService: ProdutoHasCategoriaService,
  ) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const produto = await this.produtoRepository.create(createProdutoDto);

    const categorias = [];
    for (const id_categoria of createProdutoDto.ids_categorias) {
      const categoria = await this.produtoHasCategoriaService.create({
        id_produto: produto.id,
        id_categoria,
      });
      categorias.push(categoria);
    }
    return { produto, categorias };
  }

  async findAll() {
    const produtos = await this.produtoRepository.findAll();
    if (produtos.length === 0) {
      throw new NotFoundException('Nenhum produto encontrado');
    }
    return produtos;
  }

  async findByCategory(id: number) {
    return await this.produtoRepository.findByCategory(id);
  }

  async findOne(id: number) {
    const produto = await this.produtoRepository.findOne(id);
    if (!produto) throw new NotFoundException('Produto não encontrado');
    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.produtoRepository.update(id, updateProdutoDto);
    return { message: `Produto ${produto.nome} atualizado com sucesso` };
  }

  async delete(id: number) {
    const produto = await this.produtoRepository.delete(id);
    return { message: `Produto ${produto.nome} deletado com sucesso` };
  }
}
