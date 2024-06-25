import { StatusMesa } from '@prisma/client';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMesaDto {
  @IsInt()
  @IsNotEmpty({ message: 'Número da mesa é obrigatório' })
  numero: number;

  status: StatusMesa;
}
