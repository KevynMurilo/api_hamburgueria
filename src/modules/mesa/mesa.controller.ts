import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';

@Controller('mesas')
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

  @Get(':id')
  async findOne(@Param('id') numero: number) {
    return await this.mesaService.findOne(+numero);
  }

  @Patch('update-status/:id')
  async update(@Param('id') numero: number, @Body() status: UpdateMesaDto) {
    return await this.mesaService.update(+numero, status);
  }

  @Delete(':id')
  async delete(@Param('id') numero: number) {
    return await this.mesaService.delete(+numero);
  }
}
