import { IsArray, IsEnum, ArrayNotEmpty, IsOptional } from 'class-validator';
import { StatusPedido, StatusMetodoPagamento } from '@prisma/client';
import { UpdateItensDoPedidoDto } from 'src/modules/itens-do-pedido/dto/update-itens-do-pedido.dto';

export class UpdatePedidosDto {
  @IsArray()
  @ArrayNotEmpty()
  ids_numero_mesa: number[];

  @IsEnum(StatusPedido, {
    message:
      'Status inválido. Os valores permitidos são: pendente e finalizado',
  })
  status: StatusPedido;

  @IsEnum(StatusMetodoPagamento, {
    message:
      'Metodo de pagamento inválido. Os valores permitidos são: pix, debito, credito e dinheiro',
  })
  metodo_pagamento: StatusMetodoPagamento;

  @IsOptional()
  @IsArray()
  itens?: UpdateItensDoPedidoDto[];
}
