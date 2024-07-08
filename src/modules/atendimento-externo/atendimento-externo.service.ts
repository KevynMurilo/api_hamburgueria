import { Injectable, NotFoundException } from '@nestjs/common';
import { AtendimentoExternoRepository } from './atendimento-externo.repository';
import { UpdateAtendimentoExternoDto } from './dto/update-atendimento-externo.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AtendimentoExternoService {
  constructor(
    private readonly atendimentoExternoRepository: AtendimentoExternoRepository,
  ) {}

  async create(trx: Prisma.TransactionClient, nome: string) {
    return await this.atendimentoExternoRepository.create(trx, nome);
  }

  async findAll() {
    const atendimentosExternos =
      await this.atendimentoExternoRepository.findAll();
    if (atendimentosExternos.length === 0) {
      throw new NotFoundException('Nenhuma atendimento externo cadastrado');
    }
    return atendimentosExternos;
  }

  async findOne(id: number) {
    const atendimentosExterno =
      await this.atendimentoExternoRepository.findOne(id);
    if (!atendimentosExterno) {
      throw new NotFoundException('Atendimento externo não encontrado');
    }
    return atendimentosExterno;
  }

  async update(
    id: number,
    updateAtendimentoExternoDto: UpdateAtendimentoExternoDto,
  ) {
    await this.findOne(id);

    return await this.atendimentoExternoRepository.update(
      id,
      updateAtendimentoExternoDto,
    );
  }

  async delete(id: number) {
    await this.findOne(id);

    await this.atendimentoExternoRepository.delete(id);
    return { message: `Atendimento ${id} deletada com sucesso` };
  }
}
