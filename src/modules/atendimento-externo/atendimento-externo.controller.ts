import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { AtendimentoExternoService } from './atendimento-externo.service';
import { UpdateAtendimentoExternoDto } from './dto/update-atendimento-externo.dto';

@Controller('atendimento-externo')
export class AtendimentoExternoController {
  constructor(
    private readonly atendimentoExternoService: AtendimentoExternoService,
  ) {}

  @Get()
  async findAll() {
    return await this.atendimentoExternoService.findAll();
  }

  @Get('pendentes')
  async findByPendentes() {
    return await this.atendimentoExternoService.findByPendentes();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.atendimentoExternoService.findOne(+id);
  }

  @Patch('update-status/:id')
  async update(
    @Param('id') id: number,
    @Body() status: UpdateAtendimentoExternoDto,
  ) {
    return await this.atendimentoExternoService.update(+id, status);
  }
}
