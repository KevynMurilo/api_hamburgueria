import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItensAdicionaiDto } from './dto/create-itens-adicionai.dto';
import { UpdateItensAdicionaiDto } from './dto/update-itens-adicionai.dto';
import { ItensAdicionaisRepository } from './itens-adicionais.repository';

@Injectable()
export class ItensAdicionaisService {
  constructor(
    private readonly itensAdicionaisRepository: ItensAdicionaisRepository,
  ) {}

  async create(createItensAdicionaiDto: CreateItensAdicionaiDto) {
    return await this.itensAdicionaisRepository.create(createItensAdicionaiDto);
  }

  async findAll() {
    const itens = await this.itensAdicionaisRepository.findAll();
    if (itens.length === 0) {
      throw new NotFoundException('Nenhum item adicional encontrado');
    }

    return itens;
  }

  async findOne(id: number) {
    const item = await this.itensAdicionaisRepository.findOne(id);
    if (!item) throw new NotFoundException('Item adicional não encontrado');

    return item;
  }

  async update(id: number, updateItensAdicionaiDto: UpdateItensAdicionaiDto) {
    await this.findOne(id);

    const item = await this.itensAdicionaisRepository.update(
      id,
      updateItensAdicionaiDto,
    );

    return { message: `Item ${item.nome} atualizado com sucesso` };
  }

  async delete(id: number) {
    await this.findOne(id);

    const item = await this.itensAdicionaisRepository.delete(id);

    return { message: `Item ${item.nome} deletado com sucesso` };
  }
}
