import { PartialType } from '@nestjs/mapped-types';
import { CreateItensAdicionaiDto } from './create-itens-adicionai.dto';

export class UpdateItensAdicionaiDto extends PartialType(
  CreateItensAdicionaiDto,
) {}
