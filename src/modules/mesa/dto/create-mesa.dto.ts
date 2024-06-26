import { StatusMesa } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateMesaDto {
  @IsInt()
  @IsNotEmpty({ message: 'Número da mesa é obrigatório' })
  @IsEnum(StatusMesa, {
    message: 'Status inválido. Os valores permitidos são: disponivel, ocupado',
  })
  numero: number;

  status: StatusMesa;
}
