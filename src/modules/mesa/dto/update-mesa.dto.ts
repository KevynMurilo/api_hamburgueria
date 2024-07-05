import { StatusMesa } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateMesaDto {
  @IsNotEmpty({ message: 'Status da mesa é obrigatório' })
  @IsEnum(StatusMesa, {
    message: 'Status inválido. Os valores permitidos são: disponivel, ocupada',
  })
  status: StatusMesa;
}
