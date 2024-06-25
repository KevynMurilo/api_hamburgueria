import { Body, Controller, Get, Post } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';

@Controller('mesa')
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  @Post()
  async create(@Body() data: CreateMesaDto) {
    return await this.mesaService.create(data);
  }

  @Get()
  async findAll() {
    return await this.mesaService.findAll();
  }
}
