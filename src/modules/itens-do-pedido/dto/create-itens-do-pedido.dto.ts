import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ItensPedidoHasItensAdicionaisDto } from 'src/modules/itens-pedido-has-itens-adicionais/dto/itens-pedido-has-itens-adicionais.dto';

export class CreateItensDoPedidoDto {
  @IsInt()
  @IsNotEmpty({ message: 'Id do pedido é obrigatório' })
  id_pedido: number;

  @IsInt()
  @IsNotEmpty({ message: 'Id do pedido é obrigatório' })
  id_produto: number;

  @IsInt()
  @IsNotEmpty({ message: 'Quantidade é obrigatório' })
  quantidade: number;

  @IsString()
  @IsOptional()
  observacoes: string;

  @IsArray()
  @IsOptional()
  adicionais?: ItensPedidoHasItensAdicionaisDto[];
}
