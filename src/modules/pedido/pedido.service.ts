import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidosDto } from './dto/update-pedido.dto';
import { PedidoRepository } from './pedido.repository';
import { MesaService } from '../mesa/mesa.service';
import { GarcomService } from '../garcom/garcom.service';
import { ItensDoPedidoService } from '../itens-do-pedido/itens-do-pedido.service';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateItensDoPedidoDto } from '../itens-do-pedido/dto/create-itens-do-pedido.dto';
import { PrintTcpService } from '../print-tcp/print-tcp.service';
import { AtendimentoExternoService } from '../atendimento-externo/atendimento-externo.service';

interface PrintResponse {
  message: string;
}

@Injectable()
export class PedidoService {
  private readonly logger = new Logger(PedidoService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly pedidoRepository: PedidoRepository,
    private readonly mesaService: MesaService,
    private readonly garcomService: GarcomService,
    private readonly itensDoPedidoService: ItensDoPedidoService,
    private readonly printTcpService: PrintTcpService,
    private readonly atendimentoExternoService: AtendimentoExternoService,
  ) {}

  async create(
    createPedidoDto: CreatePedidoDto,
    createItensDoPedidoDto: CreateItensDoPedidoDto[],
  ) {
    let printStatus: string = 'successo';

    if (!this.printTcpService.isConnected()) {
      printStatus = 'Erro na comunicação TCP';
      this.logger.warn(
        'A conexão TCP não está disponível. Prosseguindo com a criação do pedido sem enviar para impressão.',
      );
    }

    if (createPedidoDto.numero_mesa && createPedidoDto.nome_cliente) {
      throw new BadRequestException(
        'Não é permitido fornecer tanto numero_mesa quanto nome_cliente.',
      );
    }

    return this.prisma.$transaction(async (trx: Prisma.TransactionClient) => {
      let atendimentoId: number | undefined;

      if (createPedidoDto.numero_mesa) {
        await this.mesaService.findOne(createPedidoDto.numero_mesa);
        await this.mesaService.update(
          createPedidoDto.numero_mesa,
          {
            status: 'ocupada',
          },
          trx,
        );
      } else {
        const atendimento = await this.atendimentoExternoService.create(
          trx,
          createPedidoDto.nome_cliente,
        );
        atendimentoId = atendimento.id;
      }

      const pedido = await this.pedidoRepository.create(trx, {
        ...createPedidoDto,
        id_externo: atendimentoId,
      });

      const itensDoPedido = await this.itensDoPedidoService.createItensDoPedido(
        trx,
        pedido.id,
        createItensDoPedidoDto,
      );

      const garcom = await this.garcomService.findOneById(
        createPedidoDto.id_garcom,
      );

      const pedidoCompleto = {
        ...pedido,
        nome_cliente: createPedidoDto.nome_cliente,
        garcom,
        itens: itensDoPedido,
      };

      let printResponse: PrintResponse | undefined;
      if (this.printTcpService.isConnected()) {
        printResponse =
          await this.printTcpService.sendToPrinter(pedidoCompleto);
        if (
          printResponse &&
          printResponse.message === 'Erro ao enviar para a impressora.'
        ) {
          printStatus = printResponse.message;
        }
      }

      return {
        printStatus,
        message: 'Pedido criado com sucesso!',
      };
    });
  }

  async findAll(skip: number, take: number) {
    const pedidos = await this.pedidoRepository.findAll(skip, take);
    if (pedidos.length === 0) {
      throw new NotFoundException('Nenhum pedido cadastrado');
    }
    return pedidos;
  }

  async findManyPedidoCliente() {
    const pedidos = await this.pedidoRepository.findManyPedidoCliente();
    if (pedidos.length === 0) {
      throw new NotFoundException(`Nenhum cliente com pedido pendente`);
    }
    return pedidos;
  }

  async findByPedidoClientePendente(id: number) {
    const pedidos = await this.pedidoRepository.findByPedidoClientePendente(id);
    if (pedidos.length === 0) {
      throw new NotFoundException(
        `Nenhum pedido pendente pro cliente de id ${id}`,
      );
    }
    return pedidos;
  }

  async findByPedidoMesaPendente(numero: number) {
    const pedidos =
      await this.pedidoRepository.findByPedidoMesaPendente(numero);
    if (pedidos.length === 0) {
      throw new NotFoundException(`Nenhum pedido pendente na mesa ${numero}`);
    }
    return pedidos;
  }

  async updateOrdersStatusAndPayment(
    updatePedidosDto: UpdatePedidosDto,
  ): Promise<number> {
    const { ids_numero_mesa } = updatePedidosDto;
    if (!ids_numero_mesa.length)
      throw new NotFoundException('Nenhum pedido encontrado para atualizar');

    return this.pedidoRepository.updateOrdersStatusAndPayment(
      ids_numero_mesa,
      updatePedidosDto,
    );
  }

  async delete(id: number) {
    const pedido = await this.pedidoRepository.findOne(id);
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    await this.pedidoRepository.delete(id);
    return { message: `Pedido deletado com sucesso` };
  }
}
