import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'Nome da categoria é obrigatório' })
  @IsString()
  nome: string;
}
