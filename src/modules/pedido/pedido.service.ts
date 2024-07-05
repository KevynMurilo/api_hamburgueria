import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidosDto } from './dto/update-pedido.dto';
import { PedidoRepository } from './pedido.repository';
import { MesaService } from '../mesa/mesa.service';
import { GarcomService } from '../garcom/garcom.service';
import { ItensDoPedidoService } from '../itens-do-pedido/itens-do-pedido.service';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateItensDoPedidoDto } from '../itens-do-pedido/dto/create-itens-do-pedido.dto';
import { ItensPedidoHasItensAdicionaisService } from '../itens-pedido-has-itens-adicionais/itens-pedido-has-itens-adicionais.service';

@Injectable()
export class PedidoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pedidoRepository: PedidoRepository,
    private readonly mesaService: MesaService,
    private readonly garcomService: GarcomService,
    private readonly itensDoPedidoService: ItensDoPedidoService,
    private readonly itensPedidoHasItensAdicionaisService: ItensPedidoHasItensAdicionaisService,
  ) {}

  async create(
    createPedidoDto: CreatePedidoDto,
    createItensDoPedidoDto: CreateItensDoPedidoDto[],
  ) {
    await this.mesaService.findOne(createPedidoDto.numero_mesa);
    await this.garcomService.findOneById(createPedidoDto.id_garcom);

    return this.prisma.$transaction(async (trx: Prisma.TransactionClient) => {
      const pedido = await this.pedidoRepository.create(trx, createPedidoDto);

      const itensDoPedido = [];
      for (const itemDto of createItensDoPedidoDto) {
        const { adicionais, ...itemData } = itemDto;

        const itemDoPedido = await this.itensDoPedidoService.create(trx, {
          ...itemData,
          id_pedido: pedido.id,
        });

        const adicionaisCriados = [];
        for (const adicionalDto of adicionais) {
          const itemAdicional =
            await this.itensPedidoHasItensAdicionaisService.create(trx, {
              ...adicionalDto,
              id_item_do_pedido: itemDoPedido.id,
            });
          adicionaisCriados.push(itemAdicional);
        }

        itensDoPedido.push({ ...itemDoPedido, adicionais: adicionaisCriados });
      }

      return { pedido, itens: itensDoPedido };
    });
  }

  async findAll() {
    const pedidos = await this.pedidoRepository.findAll();
    if (pedidos.length === 0) {
      throw new NotFoundException('Nenhum pedido cadastrado');
    }
    return pedidos;
  }

  async findByPedidoMesaPendente(numero: number) {
    const pedidos =
      await this.pedidoRepository.findByPedidoMesaPendente(numero);
    if (pedidos.length === 0) {
      throw new NotFoundException(`Nenhum pedido pendente na mesa ${numero}`);
    }
    return pedidos;
  }

  async updateMany(updatePedidosDto: UpdatePedidosDto): Promise<number> {
    const { ids_numero_mesa } = updatePedidosDto;
    if (!ids_numero_mesa.length)
      throw new NotFoundException('Nenhum pedido encontrado para atualizar');

    return await this.pedidoRepository.updateMany(
      ids_numero_mesa,
      updatePedidosDto,
    );
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
