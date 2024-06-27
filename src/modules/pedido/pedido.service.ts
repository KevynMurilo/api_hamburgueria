import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoRepository } from './pedido.repository';
import { MesaService } from '../mesa/mesa.service';
import { GarcomService } from '../garcom/garcom.service';

@Injectable()
export class PedidoService {
  constructor(
    private readonly pedidoRepository: PedidoRepository,
    private readonly mesaService: MesaService,
    private readonly garcomService: GarcomService,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    await this.mesaService.findOne(createPedidoDto.numero_mesa);
    await this.garcomService.findOneById(createPedidoDto.id_garcom);
    return await this.pedidoRepository.create(createPedidoDto);
  }

  async findAll() {
    const pedidos = await this.pedidoRepository.findAll();
    if (pedidos.length === 0) {
      throw new NotFoundException('Nenhum pedido cadastrado');
    }
    return pedidos;
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepository.findOne(id);
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrada');
    }
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    await this.mesaService.findOne(updatePedidoDto.numero_mesa);
    await this.garcomService.findOneById(updatePedidoDto.id_garcom);

    return await this.pedidoRepository.update(id, updatePedidoDto);
  }

  async delete(id: number) {
    const pedido = await this.pedidoRepository.findOne(id);
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    await this.pedidoRepository.delete(id);
    return { message: `Pedido deletado com sucesso` };
  }
}
