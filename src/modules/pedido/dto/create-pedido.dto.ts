import { StatusMetodoPagamento, StatusPedido } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  @IsNotEmpty({ message: 'Número da mesa é obrigatório' })
  numero_mesa: number;

  @IsInt()
  @IsNotEmpty({ message: 'Id da mesa é obrigatório' })
  id_garcom: number;

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
