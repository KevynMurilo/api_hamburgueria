import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MesaRepository } from './mesa.repository';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MesaService {
  constructor(private readonly mesaRepository: MesaRepository) {}

  async create(createMesaDto: CreateMesaDto) {
    const mesa = await this.mesaRepository.findOne(createMesaDto.numero);
    if (mesa) {
      throw new ConflictException('Mesa já registrada');
    }
    return await this.mesaRepository.create(createMesaDto);
  }

  async findAll() {
    const mesas = await this.mesaRepository.findAll();
    if (mesas.length === 0) {
      throw new NotFoundException('Nenhuma mesa cadastrada');
    }
    return mesas;
  }

  async findOne(numero: number) {
    const mesa = await this.mesaRepository.findOne(numero);
    if (!mesa) {
      throw new NotFoundException('Mesa não encontrada');
    }
    return mesa;
  }

  async update(
    numero: number,
    updateMesaDto: UpdateMesaDto,
    trx?: Prisma.TransactionClient,
  ) {
    await this.findOne(numero);
    return await this.mesaRepository.update(numero, updateMesaDto, trx);
  }

  async delete(numero: number) {
    await this.findOne(numero);

    await this.mesaRepository.delete(numero);
    return { message: `Mesa ${numero} deletada com sucesso` };
  }
}
