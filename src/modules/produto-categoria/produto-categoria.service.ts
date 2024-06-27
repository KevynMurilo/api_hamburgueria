import { Injectable } from '@nestjs/common';
import { ProdutoCategoriaRepository } from './produto-categoria.repository';
import { CreateProdutoCategoriaDto } from './dto/create-produto-categoria.dto';
import { DeleteProdutoCategoriaDto } from './dto/delete-produto-categoria.dto';
import { ProdutoService } from '../produto/produto.service';
import { CategoriaService } from '../categoria/categoria.service';

@Injectable()
export class ProdutoCategoriaService {
  constructor(
    private readonly produtoCategoriaRepository: ProdutoCategoriaRepository,
    private readonly produtoService: ProdutoService,
    private readonly categoriaService: CategoriaService,
  ) {}

  async create(createProdutoCategoriaDto: CreateProdutoCategoriaDto) {
    await this.produtoService.findOne(createProdutoCategoriaDto.id_produto);

    await this.categoriaService.findOne(createProdutoCategoriaDto.id_produto);

    return await this.produtoCategoriaRepository.create(
      createProdutoCategoriaDto,
    );
  }

  async delete(deleteProdutoCategoriaDto: DeleteProdutoCategoriaDto) {
    await this.produtoService.findOne(deleteProdutoCategoriaDto.id_produto);

    await this.categoriaService.findOne(deleteProdutoCategoriaDto.id_produto);

    return await this.produtoCategoriaRepository.delete(
      deleteProdutoCategoriaDto,
    );
  }
}
