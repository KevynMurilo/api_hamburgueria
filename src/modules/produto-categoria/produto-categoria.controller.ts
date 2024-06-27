import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { ProdutoCategoriaService } from './produto-categoria.service';
import { CreateProdutoCategoriaDto } from './dto/create-produto-categoria.dto';
import { DeleteProdutoCategoriaDto } from './dto/delete-produto-categoria.dto';

@Controller('produto-categoria')
export class ProdutoCategoriaController {
  constructor(
    private readonly produtoCategoriaService: ProdutoCategoriaService,
  ) {}

  @Post()
  async create(@Body() createProdutoCategoriaDto: CreateProdutoCategoriaDto) {
    return await this.produtoCategoriaService.create(createProdutoCategoriaDto);
  }

  @Delete(':id_produto/:id_categoria')
  async delete(
    @Param('id_produto') id_produto: number,
    @Param('id_categoria') id_categoria: number,
  ) {
    const deleteDto: DeleteProdutoCategoriaDto = {
      id_produto: +id_produto,
      id_categoria: +id_categoria,
    };
    return await this.produtoCategoriaService.delete(deleteDto);
  }
}
