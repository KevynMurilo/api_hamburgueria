import { Body, Controller, Get, Post } from '@nestjs/common';
import { GarcomService } from './garcom.service';
import { CreateGarcomDto } from './dto/create-garcom.dto';

@Controller('garcom')
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
}
