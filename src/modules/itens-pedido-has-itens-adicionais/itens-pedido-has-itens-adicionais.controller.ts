import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { ItensPedidoHasItensAdicionaisService } from './itens-pedido-has-itens-adicionais.service';
import { ItensPedidoHasItensAdicionaisDto } from './dto/itens-pedido-has-itens-adicionais.dto';

@Controller('itenspedidos-has-itensadicionais')
export class ItensPedidoHasItensAdicionaisController {
  constructor(
    private readonly itensPedidoHasItensAdicionaisService: ItensPedidoHasItensAdicionaisService,
  ) {}

  @Post()
  async create(
    @Body()
    createDto: ItensPedidoHasItensAdicionaisDto,
  ) {
    return await this.itensPedidoHasItensAdicionaisService.create(createDto);
  }

  @Delete(':id_item_do_pedido/:id_item_adicional')
  async delete(
    @Param('id_item_do_pedido') id_item_do_pedido: number,
    @Param('id_item_adicional') id_item_adicional: number,
  ) {
    const deleteDto: ItensPedidoHasItensAdicionaisDto = {
      id_item_do_pedido: +id_item_do_pedido,
      id_item_adicional: +id_item_adicional,
    };
    return await this.itensPedidoHasItensAdicionaisService.delete(deleteDto);
  }
}
