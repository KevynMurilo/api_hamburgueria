import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItensDoPedidoDto } from './dto/create-itens-do-pedido.dto';
import { UpdateItensDoPedidoDto } from './dto/update-itens-do-pedido.dto';
import { ItensDoPedidoRepository } from './itens-do-pedido.repository';
import { ProdutoService } from '../produto/produto.service';
import { PedidoService } from '../pedido/pedido.service';

@Injectable()
export class ItensDoPedidoService {
  constructor(
    private readonly itensDoPedidoRepository: ItensDoPedidoRepository,
    private readonly pedidoService: PedidoService,
    private readonly produtoService: ProdutoService,
  ) {}

  async create(createItensDoPedidoDto: CreateItensDoPedidoDto) {
    await this.pedidoService.findOne(createItensDoPedidoDto.id_pedido);
    await this.produtoService.findOne(createItensDoPedidoDto.id_produto);

    return await this.itensDoPedidoRepository.create(createItensDoPedidoDto);
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
    await this.pedidoService.findOne(updateItensDoPedidoDto.id_pedido);
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
