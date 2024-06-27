import { PartialType } from '@nestjs/mapped-types';
import { CreateItensDoPedidoDto } from './create-itens-do-pedido.dto';

export class UpdateItensDoPedidoDto extends PartialType(
  CreateItensDoPedidoDto,
) {}
