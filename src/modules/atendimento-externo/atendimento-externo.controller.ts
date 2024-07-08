// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { AtendimentoExternoService } from './atendimento-externo.service';
// import { CreateAtendimentoExterno } from './dto/create-atendimento-externo.dto';
// import { UpdateAtendimentoExternoDto } from './dto/update-atendimento-externo.dto';

// @Controller('atendimento-externo')
// export class AtendimentoExternoController {
//   constructor(
//     private readonly atendimentoExternoService: AtendimentoExternoService,
//   ) {}

//   @Post()
//   async create(@Body() nome: string) {
//     return await this.atendimentoExternoService.create(nome);
//   }

//   @Get()
//   async findAll() {
//     return await this.atendimentoExternoService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: number) {
//     return await this.atendimentoExternoService.findOne(+id);
//   }

//   @Patch('update-status/:id')
//   async update(
//     @Param('id') id: number,
//     @Body() status: UpdateAtendimentoExternoDto,
//   ) {
//     return await this.atendimentoExternoService.update(+id, status);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: number) {
//     return await this.atendimentoExternoService.delete(+id);
//   }
// }
