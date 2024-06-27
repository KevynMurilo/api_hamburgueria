import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ItensDoPedidoService } from './itens-do-pedido.service';
import { CreateItensDoPedidoDto } from './dto/create-itens-do-pedido.dto';
import { UpdateItensDoPedidoDto } from './dto/update-itens-do-pedido.dto';

@Controller('itens-do-pedido')
export class ItensDoPedidoController {
  constructor(private readonly itensDoPedidoService: ItensDoPedidoService) {}

  @Post()
  async create(@Body() createItensDoPedidoDto: CreateItensDoPedidoDto) {
    return await this.itensDoPedidoService.create(createItensDoPedidoDto);
  }

  @Get()
  async findAll() {
    return await this.itensDoPedidoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.itensDoPedidoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItensDoPedidoDto: UpdateItensDoPedidoDto,
  ) {
    return await this.itensDoPedidoService.update(+id, updateItensDoPedidoDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.itensDoPedidoService.delete(+id);
  }
}
