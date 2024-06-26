import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MesaRepository } from './mesa.repository';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

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

  async update(numero: number, updateMesaDto: UpdateMesaDto) {
    const mesa = await this.mesaRepository.findOne(numero);
    if (!mesa) {
      throw new NotFoundException('Mesa não encontrada');
    }

    return await this.mesaRepository.update(numero, updateMesaDto);
  }

  async delete(numero: number) {
    const mesa = await this.mesaRepository.findOne(numero);
    if (!mesa) {
      throw new NotFoundException('Mesa não encontrada');
    }

    await this.mesaRepository.delete(numero);
    return { message: `Mesa ${numero} deletada com sucesso` };
  }
}
