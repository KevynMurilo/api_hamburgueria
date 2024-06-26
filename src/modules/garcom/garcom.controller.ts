import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GarcomService } from './garcom.service';
import { CreateGarcomDto } from './dto/create-garcom.dto';

@Controller('garcons')
export class GarcomController {
  constructor(private readonly garcomService: GarcomService) {}

  @Post()
  async create(@Body() data: CreateGarcomDto) {
    return this.garcomService.create(data);
  }

  @Get()
  async findAll() {
    return this.garcomService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.garcomService.delete(+id);
  }
}
