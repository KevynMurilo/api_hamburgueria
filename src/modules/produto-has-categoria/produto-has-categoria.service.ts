import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProdutoHasCategoriaRepository } from './produto-has-categoria.repository';
import { ProdutoCategoriaDto } from './dto/produto-categoria.dto';
import { ProdutoService } from '../produto/produto.service';
import { CategoriaService } from '../categoria/categoria.service';

@Injectable()
export class ProdutoHasCategoriaService {
  constructor(
    private readonly produtoHasCategoriaRepository: ProdutoHasCategoriaRepository,
    private readonly produtoService: ProdutoService,
    private readonly categoriaService: CategoriaService,
  ) {}

  async create(produtoCategoriaDto: ProdutoCategoriaDto) {
    const verify =
      await this.produtoHasCategoriaRepository.findOne(produtoCategoriaDto);
    if (verify)
      throw new ConflictException(
        'Vinculo entre produto e categoria já registrado',
      );

    await this.produtoService.findOne(produtoCategoriaDto.id_produto);
    await this.categoriaService.findOne(produtoCategoriaDto.id_categoria);

    return await this.produtoHasCategoriaRepository.create(produtoCategoriaDto);
  }

  async findOne(produtoCategoriaDto: ProdutoCategoriaDto) {
    const produtoCategoria =
      await this.produtoHasCategoriaRepository.findOne(produtoCategoriaDto);
    if (!produtoCategoria) {
      throw new NotFoundException(
        'Nenhum vinculo entre produto e categoria encontrado',
      );
    }

    return produtoCategoria;
  }

  async delete(produtoCategoriaDto: ProdutoCategoriaDto) {
    await this.produtoService.findOne(produtoCategoriaDto.id_produto);

    await this.categoriaService.findOne(produtoCategoriaDto.id_categoria);

    return await this.produtoHasCategoriaRepository.delete(produtoCategoriaDto);
  }
}
