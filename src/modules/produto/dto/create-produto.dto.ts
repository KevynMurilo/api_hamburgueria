import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  descricao: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Preço é obrigatório' })
  preco: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'Pelo menos uma categoria deve ser selecionada' })
  @IsNumber({}, { each: true })
  ids_categorias: number[];
}
