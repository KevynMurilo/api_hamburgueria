import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
