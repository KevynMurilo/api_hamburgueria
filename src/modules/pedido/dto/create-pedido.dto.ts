import { StatusPedido } from '@prisma/client';
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
      'Status inválido. Os valores permitidos são: novo, preparo, pronto e entregue',
  })
  status: StatusPedido;
}
