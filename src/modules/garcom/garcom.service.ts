import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GarcomRepository } from './garcom.repository';
import { CreateGarcomDto } from './dto/create-garcom.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GarcomService {
  constructor(private readonly garcomRepository: GarcomRepository) {}

  async create(createGarcomDto: CreateGarcomDto): Promise<CreateGarcomDto> {
    const emailExists = await this.garcomRepository.findOneByEmail(
      createGarcomDto.email,
    );

    if (emailExists) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashPassword = await this.hashPassword(createGarcomDto.senha);

    return this.garcomRepository.create({
      ...createGarcomDto,
      senha: hashPassword,
    });
  }

  async findAll(): Promise<CreateGarcomDto[]> {
    const garcons = await this.garcomRepository.findAll();
    if (garcons.length === 0) {
      throw new NotFoundException('Nenhum garçom encontrado');
    }

    return garcons;
  }

  async findOneByEmail(email: string) {
    const garcom = await this.garcomRepository.findOneByEmail(email);
    if (!garcom) {
      throw new NotFoundException('Garçom não encontrado');
    }

    return garcom;
  }

  async findOneById(id: number) {
    const garcom = await this.garcomRepository.findOneById(id);
    if (!garcom) {
      throw new NotFoundException('Garçom não encontrado');
    }

    return garcom;
  }

  async delete(id: number) {
    const garcom = await this.garcomRepository.findOneById(id);
    if (!garcom) {
      throw new NotFoundException('Garçom não encontrado');
    }

    await this.garcomRepository.delete(id);
    return { message: `Garçom ${garcom.nome} deletado com sucesso` };
  }

  private async hashPassword(senha: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(senha, saltOrRounds);
  }
}
