import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto) {
    return await this.pedidoService.create(createPedidoDto);
  }

  @Get()
  async findAll() {
    return await this.pedidoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pedidoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    return await this.pedidoService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.pedidoService.delete(+id);
  }
}
