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
    const emailExists = await this.garcomRepository.findOne(
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
      throw new NotFoundException('Nenhum garçon encontrado');
    }

    return garcons;
  }

  async findOne(email: string) {
    const garcom = await this.garcomRepository.findOne(email);
    if (!garcom) {
      throw new NotFoundException('Nenhum garçon encontrado');
    }

    return garcom;
  }

  private async hashPassword(senha: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(senha, saltOrRounds);
  }
}
