import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { ProdutoHasCategoriaService } from './produto-has-categoria.service';
import { ProdutoCategoriaDto } from './dto/produto-categoria.dto';

@Controller('produto-categoria')
export class ProdutoHasCategoriaController {
  constructor(
    private readonly produtoHasCategoriaService: ProdutoHasCategoriaService,
  ) {}

  @Post()
  async create(@Body() produtoCategoriaDto: ProdutoCategoriaDto) {
    return await this.produtoHasCategoriaService.create(produtoCategoriaDto);
  }

  @Delete(':id_produto/:id_categoria')
  async delete(
    @Param('id_produto') id_produto: number,
    @Param('id_categoria') id_categoria: number,
  ) {
    const produtoCategoriaDto: ProdutoCategoriaDto = {
      id_produto: +id_produto,
      id_categoria: +id_categoria,
    };
    return await this.produtoHasCategoriaService.delete(produtoCategoriaDto);
  }
}
