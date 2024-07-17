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
import { UpdatePedidosDto } from './dto/update-pedido.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { CreateItensDoPedidoDto } from '../itens-do-pedido/dto/create-itens-do-pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(
    @Body() data: { pedido: CreatePedidoDto; itens: CreateItensDoPedidoDto[] },
  ) {
    return await this.pedidoService.create(data.pedido, data.itens);
  }

  @Get()
  async findAll() {
    return await this.pedidoService.findAll();
  }

  @Get('pendente/cliente')
  async findManyPedidoCliente() {
    return await this.pedidoService.findManyPedidoCliente();
  }

  @Get('mesa/:numero')
  async findByPedidoMesa(@Param('numero') numero: number) {
    return await this.pedidoService.findByPedidoMesaPendente(+numero);
  }

  @Get('cliente/:id')
  async findByClienteMesa(@Param('id') id: number) {
    return await this.pedidoService.findByPedidoClientePendente(+id);
  }

  @Patch('update/status')
  async updateStatus(@Body() updatePedidosDto: UpdatePedidosDto) {
    return await this.pedidoService.updateManyStatusEMetodoPagamento(
      updatePedidosDto,
    );
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.pedidoService.delete(+id);
  }
}
