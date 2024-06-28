import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItensAdicionaiDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome do item adicional é obrigatório' })
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Preço é obrigatório' })
  preco: number;
}
