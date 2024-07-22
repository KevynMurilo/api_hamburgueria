import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItensDoPedidoDto } from './dto/create-itens-do-pedido.dto';
import { UpdateItensDoPedidoDto } from './dto/update-itens-do-pedido.dto';
import { ItensDoPedidoRepository } from './itens-do-pedido.repository';
import { ProdutoService } from '../produto/produto.service';
import { Prisma } from '@prisma/client';
import { ItensPedidoHasItensAdicionaisService } from '../itens-pedido-has-itens-adicionais/itens-pedido-has-itens-adicionais.service';

@Injectable()
export class ItensDoPedidoService {
  constructor(
    private readonly itensDoPedidoRepository: ItensDoPedidoRepository,
    private readonly produtoService: ProdutoService,
    private readonly itensPedidoHasItensAdicionaisService: ItensPedidoHasItensAdicionaisService,
  ) {}

  async create(
    trx: Prisma.TransactionClient,
    createItensDoPedidoDto: CreateItensDoPedidoDto,
  ) {
    await this.produtoService.findOne(createItensDoPedidoDto.id_produto);

    return await this.itensDoPedidoRepository.create(
      trx,
      createItensDoPedidoDto,
    );
  }

  async createItensDoPedido(
    trx: Prisma.TransactionClient,
    pedidoId: number,
    createItensDoPedidoDto: CreateItensDoPedidoDto[],
  ) {
    const itensDoPedido = [];

    for (const itemDto of createItensDoPedidoDto) {
      const { adicionais = [], ...itemData } = itemDto;

      const produto = await this.produtoService.findOne(itemDto.id_produto);
      const itemDoPedido = await this.create(trx, {
        ...itemData,
        id_pedido: pedidoId,
      });

      const itensAdicionais =
        await this.itensPedidoHasItensAdicionaisService.createMultipleAdditionalItems(
          trx,
          itemDoPedido.id,
          adicionais,
        );

      itensDoPedido.push({
        ...itemDoPedido,
        produto,
        adicionais: itensAdicionais,
      });
    }

    return itensDoPedido;
  }

  async findAll() {
    const itensDoPedido = await this.itensDoPedidoRepository.findAll();
    if (itensDoPedido.length === 0) {
      throw new NotFoundException('Nenhum item do pedido encontrado');
    }
    return itensDoPedido;
  }

  async findOne(id: number) {
    const itemDoPedido = await this.itensDoPedidoRepository.findOne(id);
    if (!itemDoPedido) {
      throw new NotFoundException(`Item do pedido com id ${id} não encontrado`);
    }
    return itemDoPedido;
  }

  async update(id: number, updateItensDoPedidoDto: UpdateItensDoPedidoDto) {
    await this.findOne(id);
    await this.produtoService.findOne(updateItensDoPedidoDto.id_produto);

    return await this.itensDoPedidoRepository.update(
      id,
      updateItensDoPedidoDto,
    );
  }

  async delete(id: number) {
    await this.findOne(id);
    return await this.itensDoPedidoRepository.delete(id);
  }
}
