import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGarcomDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString()
  senha: string;
}
