import { Test, TestingModule } from '@nestjs/testing';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

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
            findOne: jest.fn(),
            update: jest.fn(),
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
    it('should call PedidoService.create and return created pedido', async () => {
      const createPedidoDto: CreatePedidoDto = {
        status: 'preparo',
        numero_mesa: 1,
        id_garcom: 1,
      };
      const createdPedido = {
        id: 1,
        ...createPedidoDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdPedido as any);

      const result = await controller.create(createPedidoDto);

      expect(result).toBe(createdPedido);
      expect(service.create).toHaveBeenCalledWith(createPedidoDto);
    });
  });

  describe('findAll', () => {
    it('should call PedidoService.findAll and return array of pedidos', async () => {
      const pedidos = [
        { id: 1, status: 'EM_PREPARO', numero_mesa: 1, id_garcom: 1 },
        { id: 2, status: 'EM_PREPARO', numero_mesa: 2, id_garcom: 2 },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(pedidos as any);

      const result = await controller.findAll();

      expect(result).toBe(pedidos);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call PedidoService.findOne and return the pedido', async () => {
      const id = '1';
      const pedido = { id: 1, status: 'preparo', numero_mesa: 1, id_garcom: 1 };

      jest.spyOn(service, 'findOne').mockResolvedValue(pedido as any);

      const result = await controller.findOne(id);

      expect(result).toBe(pedido);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should call PedidoService.update and return updated pedido', async () => {
      const id = '1';
      const updatePedidoDto: UpdatePedidoDto = {
        status: 'pronto',
        numero_mesa: 2,
        id_garcom: 2,
      };
      const updatedPedido = { id: 1, ...updatePedidoDto };

      jest.spyOn(service, 'update').mockResolvedValue(updatedPedido as any);

      const result = await controller.update(id, updatePedidoDto);

      expect(result).toBe(updatedPedido);
      expect(service.update).toHaveBeenCalledWith(+id, updatePedidoDto);
    });
  });

  describe('remove', () => {
    it('should call PedidoService.delete and return deletion message', async () => {
      const id = '1';
      const deletionMessage = { message: 'Pedido deletado com sucesso' };

      jest.spyOn(service, 'delete').mockResolvedValue(deletionMessage as any);

      const result = await controller.remove(id);

      expect(result).toBe(deletionMessage);
      expect(service.delete).toHaveBeenCalledWith(+id);
    });
  });
});
