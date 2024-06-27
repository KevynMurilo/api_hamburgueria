import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoRepository } from './produto.repository';

@Injectable()
export class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async create(createProdutoDto: CreateProdutoDto) {
    return await this.produtoRepository.create(createProdutoDto);
  }

  async findAll() {
    const produtos = await this.produtoRepository.findAll();
    if (produtos.length === 0) {
      throw new NotFoundException('Nenhum produto encontrado');
    }
    return produtos;
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
