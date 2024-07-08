import { StatusExterno } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateAtendimentoExternoDto {
  @IsNotEmpty({ message: 'Status do atendimento externo é obrigatório' })
  @IsEnum(StatusExterno, {
    message:
      'Status inválido. Os valores permitidos são: pendente e finalizado',
  })
  status: StatusExterno;
}
