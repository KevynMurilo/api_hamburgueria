import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ItensPedidoHasItensAdicionaisRepository } from './itens-pedido-has-itens-adicionais.repository';
import { ItensPedidoHasItensAdicionaisDto } from './dto/itens-pedido-has-itens-adicionais.dto';
import { ItensAdicionaisService } from '../itens-adicionais/itens-adicionais.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItensPedidoHasItensAdicionaisService {
  constructor(
    private readonly itensPedidoHasItensAdicionaisRepository: ItensPedidoHasItensAdicionaisRepository,
    private readonly itensAdicionaisService: ItensAdicionaisService,
  ) {}

  async create(
    trx: Prisma.TransactionClient,
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

    await this.itensAdicionaisService.findOne(
      itensPedidoHasItensAdicionaisDto.id_item_adicional,
    );

    return await this.itensPedidoHasItensAdicionaisRepository.create(
      trx,
      itensPedidoHasItensAdicionaisDto,
    );
  }

  async createMultipleAdditionalItems(
    trx: Prisma.TransactionClient,
    itemDoPedidoId: number,
    adicionais: { id_item_adicional: number }[] = [],
  ) {
    const adicionaisCriados = [];

    if (!Array.isArray(adicionais)) {
      throw new BadRequestException('Adicionais deve ser um array.');
    }

    for (const adicionalDto of adicionais) {
      await this.create(trx, {
        ...adicionalDto,
        id_item_do_pedido: itemDoPedidoId,
      });

      const adicionalCompleto = await this.itensAdicionaisService.findOne(
        adicionalDto.id_item_adicional,
      );

      adicionaisCriados.push({ itemAdicional: adicionalCompleto });
    }

    return adicionaisCriados;
  }
}
