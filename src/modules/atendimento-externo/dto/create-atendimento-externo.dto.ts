import { StatusExterno } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateAtendimentoExterno {
  @IsNotEmpty({ message: 'Nome do cliente é obrigatório' })
  nome_cliente: string;

  @IsEnum(StatusExterno, {
    message:
      'Status inválido. Os valores permitidos são: pendente e finalizado',
  })
  status: StatusExterno;
}
