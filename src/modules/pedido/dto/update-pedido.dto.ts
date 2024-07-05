import { IsArray, IsEnum, ArrayNotEmpty } from 'class-validator';
import { StatusPedido, StatusMetodoPagamento } from '@prisma/client';

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
}
