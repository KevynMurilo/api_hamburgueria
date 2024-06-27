import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  async findAll() {
    return await this.categoriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.categoriaService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body('nome') nome: string) {
    return await this.categoriaService.update(+id, nome);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.categoriaService.delete(+id);
  }
}
