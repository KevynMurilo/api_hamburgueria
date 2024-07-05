import { Test, TestingModule } from '@nestjs/testing';
import { PedidoService } from './pedido.service';
import { PedidoRepository } from './pedido.repository';
import { MesaService } from '../mesa/mesa.service';
import { GarcomService } from '../garcom/garcom.service';
import { ItensDoPedidoService } from '../itens-do-pedido/itens-do-pedido.service';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidosDto } from './dto/update-pedido.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateItensDoPedidoDto } from '../itens-do-pedido/dto/create-itens-do-pedido.dto';
import { ItensPedidoHasItensAdicionaisService } from '../itens-pedido-has-itens-adicionais/itens-pedido-has-itens-adicionais.service';

describe('PedidoService', () => {
  let service: PedidoService;
  let pedidoRepository: PedidoRepository;
  let mesaService: MesaService;
  let garcomService: GarcomService;
  let itensDoPedidoService: ItensDoPedidoService;
  let itensPedidoHasItensAdicionaisService: ItensPedidoHasItensAdicionaisService;
  let trx: Prisma.TransactionClient;

  beforeEach(async () => {
    trx = {} as Prisma.TransactionClient;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoService,
        {
          provide: PedidoRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByPedidoMesaPendente: jest.fn(),
            updateMany: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn().mockImplementation((fn) => fn(trx)),
          },
        },
        {
          provide: MesaService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: GarcomService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
        {
          provide: ItensDoPedidoService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: ItensPedidoHasItensAdicionaisService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PedidoService>(PedidoService);
    pedidoRepository = module.get<PedidoRepository>(PedidoRepository);
    mesaService = module.get<MesaService>(MesaService);
    garcomService = module.get<GarcomService>(GarcomService);
    itensDoPedidoService =
      module.get<ItensDoPedidoService>(ItensDoPedidoService);
    itensPedidoHasItensAdicionaisService =
      module.get<ItensPedidoHasItensAdicionaisService>(
        ItensPedidoHasItensAdicionaisService,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new pedido', async () => {
      const createPedidoDto: CreatePedidoDto = {
        numero_mesa: 1,
        id_garcom: 1,
        status: 'pendente',
        metodo_pagamento: 'pix',
      };

      const createItensDoPedidoDto: CreateItensDoPedidoDto[] = [
        {
          id_pedido: 1,
          id_produto: 1,
          quantidade: 1,
          observacoes: 'Teste',
          adicionais: [],
        },
      ];

      jest.spyOn(mesaService, 'findOne').mockResolvedValue({} as any);
      jest.spyOn(garcomService, 'findOneById').mockResolvedValue({} as any);
      jest
        .spyOn(pedidoRepository, 'create')
        .mockResolvedValue({ id: 1, ...createPedidoDto } as any);
      jest
        .spyOn(itensDoPedidoService, 'create')
        .mockResolvedValue({ id: 1 } as any);
      jest
        .spyOn(itensPedidoHasItensAdicionaisService, 'create')
        .mockResolvedValue({} as any);

      const result = await service.create(
        createPedidoDto,
        createItensDoPedidoDto,
      );

      expect(result).toEqual({
        pedido: { id: 1, ...createPedidoDto },
        itens: [{ id: 1, adicionais: [] }],
      });
      expect(mesaService.findOne).toHaveBeenCalledWith(
        createPedidoDto.numero_mesa,
      );
      expect(garcomService.findOneById).toHaveBeenCalledWith(
        createPedidoDto.id_garcom,
      );
      expect(pedidoRepository.create).toHaveBeenCalledWith(
        trx,
        createPedidoDto,
      );
      expect(itensDoPedidoService.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all pedidos', async () => {
      const pedidos = [{ id: 1 }];
      jest.spyOn(pedidoRepository, 'findAll').mockResolvedValue(pedidos as any);

      const result = await service.findAll();

      expect(result).toEqual(pedidos);
      expect(pedidoRepository.findAll).toHaveBeenCalled();
    });

    it('should throw not found exception if no pedidos found', async () => {
      jest.spyOn(pedidoRepository, 'findAll').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByPedidoMesaPendente', () => {
    it('should return pedidos by mesa with pending status', async () => {
      const numero = 1;
      const pedidos = [{ id: 1 }];
      jest
        .spyOn(pedidoRepository, 'findByPedidoMesaPendente')
        .mockResolvedValue(pedidos as any);

      const result = await service.findByPedidoMesaPendente(numero);

      expect(result).toEqual(pedidos);
      expect(pedidoRepository.findByPedidoMesaPendente).toHaveBeenCalledWith(
        numero,
      );
    });

    it('should throw not found exception if no pedidos found', async () => {
      const numero = 1;
      jest
        .spyOn(pedidoRepository, 'findByPedidoMesaPendente')
        .mockResolvedValue([]);

      await expect(service.findByPedidoMesaPendente(numero)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateMany', () => {
    it('should update multiple pedidos', async () => {
      const updatePedidosDto: UpdatePedidosDto = {
        ids_numero_mesa: [1, 2],
        status: 'finalizado',
        metodo_pagamento: 'debito',
      };

      jest.spyOn(pedidoRepository, 'updateMany').mockResolvedValue(2);

      const result = await service.updateMany(updatePedidosDto);

      expect(result).toEqual(2);
      expect(pedidoRepository.updateMany).toHaveBeenCalledWith(
        updatePedidosDto.ids_numero_mesa,
        updatePedidosDto,
      );
    });

    it('should throw not found exception if no ids provided', async () => {
      const updatePedidosDto: UpdatePedidosDto = {
        ids_numero_mesa: [],
        status: 'finalizado',
        metodo_pagamento: 'debito',
      };

      await expect(service.updateMany(updatePedidosDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a pedido', async () => {
      const id = 1;
      const pedido = { id };
      jest.spyOn(pedidoRepository, 'findOne').mockResolvedValue(pedido as any);
      jest.spyOn(pedidoRepository, 'delete').mockResolvedValue(pedido as any);

      const result = await service.delete(id);

      expect(result).toEqual({ message: 'Pedido deletado com sucesso' });
      expect(pedidoRepository.findOne).toHaveBeenCalledWith(id);
      expect(pedidoRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw not found exception if pedido not found', async () => {
      const id = 1;
      jest.spyOn(pedidoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.delete(id)).rejects.toThrow(NotFoundException);
    });
  });
});
