import { Injectable, NotFoundException } from '@nestjs/common';
import { MesaRepository } from './mesa.repository';
import { CreateMesaDto } from './dto/create-mesa.dto';

@Injectable()
export class MesaService {
  constructor(private readonly mesaRepository: MesaRepository) {}

  async create(createMesaDto: CreateMesaDto) {
    return await this.mesaRepository.create(createMesaDto);
  }

  async findAll() {
    const mesas = await this.mesaRepository.findAll();
    if (mesas.length === 0) {
      throw new NotFoundException('Nenhuma mesa cadastrada');
    }
    return mesas;
  }
}
