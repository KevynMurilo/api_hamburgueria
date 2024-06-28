import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItensPedidoHasItensAdicionaisRepository } from './itens-pedido-has-itens-adicionais.repository';
import { ItensPedidoHasItensAdicionaisDto } from './dto/itens-pedido-has-itens-adicionais.dto';
import { ItensDoPedidoService } from '../itens-do-pedido/itens-do-pedido.service';
import { ItensAdicionaisService } from '../itens-adicionais/itens-adicionais.service';

@Injectable()
export class ItensPedidoHasItensAdicionaisService {
  constructor(
    private readonly itensPedidoHasItensAdicionaisRepository: ItensPedidoHasItensAdicionaisRepository,
    private readonly itensDoPedidoService: ItensDoPedidoService,
    private readonly itensAdicionaisService: ItensAdicionaisService,
  ) {}

  async create(
    itensPedidoHasItensAdicionaisDto: ItensPedidoHasItensAdicionaisDto,
  ) {
    const verify = await this.itensPedidoHasItensAdicionaisRepository.findOne(
      itensPedidoHasItensAdicionaisDto,
    );
    if (verify) {
      throw new ConflictException(
        'Vinculo entre itens do pedido e itens adicionais já registrado',
      );
    }

    await this.itensDoPedidoService.findOne(
      itensPedidoHasItensAdicionaisDto.id_item_do_pedido,
    );

    await this.itensAdicionaisService.findOne(
      itensPedidoHasItensAdicionaisDto.id_item_adicional,
    );

    return await this.itensPedidoHasItensAdicionaisRepository.create(
      itensPedidoHasItensAdicionaisDto,
    );
  }

  async findOne(
    itensPedidoHasItensAdicionaisDto: ItensPedidoHasItensAdicionaisDto,
  ) {
    const produtoCategoria =
      await this.itensPedidoHasItensAdicionaisRepository.findOne(
        itensPedidoHasItensAdicionaisDto,
      );
    if (!produtoCategoria) {
      throw new NotFoundException(
        'Nenhum vinculo entre produto e categoria encontrado',
      );
    }

    return produtoCategoria;
  }

  async delete(
    itensPedidoHasItensAdicionaisDto: ItensPedidoHasItensAdicionaisDto,
  ) {
    await this.itensDoPedidoService.findOne(
      itensPedidoHasItensAdicionaisDto.id_item_do_pedido,
    );

    await this.itensAdicionaisService.findOne(
      itensPedidoHasItensAdicionaisDto.id_item_adicional,
    );

    return await this.itensPedidoHasItensAdicionaisRepository.delete(
      itensPedidoHasItensAdicionaisDto,
    );
  }
}
