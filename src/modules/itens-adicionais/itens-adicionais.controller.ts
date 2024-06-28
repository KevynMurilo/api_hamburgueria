import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItensAdicionaisService } from './itens-adicionais.service';
import { CreateItensAdicionaiDto } from './dto/create-itens-adicionai.dto';
import { UpdateItensAdicionaiDto } from './dto/update-itens-adicionai.dto';

@Controller('itens-adicionais')
export class ItensAdicionaisController {
  constructor(
    private readonly itensAdicionaisService: ItensAdicionaisService,
  ) {}

  @Post()
  async create(@Body() createItensAdicionaiDto: CreateItensAdicionaiDto) {
    return await this.itensAdicionaisService.create(createItensAdicionaiDto);
  }

  @Get()
  async findAll() {
    return await this.itensAdicionaisService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.itensAdicionaisService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateItensAdicionaiDto: UpdateItensAdicionaiDto,
  ) {
    return await this.itensAdicionaisService.update(
      +id,
      updateItensAdicionaiDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.itensAdicionaisService.delete(+id);
  }
}
