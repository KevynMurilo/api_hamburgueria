import { Test, TestingModule } from '@nestjs/testing';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { CreateItensDoPedidoDto } from '../itens-do-pedido/dto/create-itens-do-pedido.dto';
import { UpdatePedidosDto } from './dto/update-pedido.dto';

describe('PedidoController', () => {
  let controller: PedidoController;
  let service: PedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoController],
      providers: [
        {
          provide: PedidoService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByPedidoMesaPendente: jest.fn(),
            updateMany: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PedidoController>(PedidoController);
    service = module.get<PedidoService>(PedidoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      const result = { pedido: {}, itens: [] };
      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(
        await controller.create({
          pedido: createPedidoDto,
          itens: createItensDoPedidoDto,
        }),
      ).toBe(result);
      expect(service.create).toHaveBeenCalledWith(
        createPedidoDto,
        createItensDoPedidoDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return all pedidos', async () => {
      const result = [{ id: 1 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findByPedidoMesa', () => {
    it('should return pedidos by mesa with pending status', async () => {
      const numero = 1;
      const result = [{ id: 1 }];
      jest
        .spyOn(service, 'findByPedidoMesaPendente')
        .mockResolvedValue(result as any);

      expect(await controller.findByPedidoMesa(numero)).toBe(result);
      expect(service.findByPedidoMesaPendente).toHaveBeenCalledWith(numero);
    });
  });

  describe('updateStatus', () => {
    it('should update the status of multiple pedidos', async () => {
      const updatePedidosDto: UpdatePedidosDto = {
        ids_numero_mesa: [1, 2],
        status: 'finalizado',
        metodo_pagamento: 'debito',
      };
      const result = 2;
      jest.spyOn(service, 'updateMany').mockResolvedValue(result);

      expect(await controller.updateStatus(updatePedidosDto)).toBe(result);
      expect(service.updateMany).toHaveBeenCalledWith(updatePedidosDto);
    });
  });

  describe('remove', () => {
    it('should delete a pedido', async () => {
      const id = 1;
      const result = { message: 'Pedido deletado com sucesso' };
      jest.spyOn(service, 'delete').mockResolvedValue(result as any);

      expect(await controller.remove(id)).toBe(result);
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
