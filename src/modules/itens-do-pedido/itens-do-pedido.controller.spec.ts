import { Test, TestingModule } from '@nestjs/testing';
import { ItensDoPedidoController } from './itens-do-pedido.controller';
import { ItensDoPedidoService } from './itens-do-pedido.service';
import { CreateItensDoPedidoDto } from './dto/create-itens-do-pedido.dto';
import { UpdateItensDoPedidoDto } from './dto/update-itens-do-pedido.dto';
import { NotFoundException } from '@nestjs/common';

describe('ItensDoPedidoController', () => {
  let controller: ItensDoPedidoController;
  let service: ItensDoPedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItensDoPedidoController],
      providers: [
        {
          provide: ItensDoPedidoService,
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

    controller = module.get<ItensDoPedidoController>(ItensDoPedidoController);
    service = module.get<ItensDoPedidoService>(ItensDoPedidoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an item of order', async () => {
      const createItensDoPedidoDto: CreateItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 1,
        observacoes: 'none',
      };
      const result = { id: 1, ...createItensDoPedidoDto };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createItensDoPedidoDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createItensDoPedidoDto);
    });

    it('should throw NotFoundException if pedido or produto not found', async () => {
      const createItensDoPedidoDto: CreateItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 1,
        observacoes: 'none',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new NotFoundException());

      await expect(controller.create(createItensDoPedidoDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const items = [
        {
          id: 1,
          id_pedido: 1,
          id_produto: 1,
          quantidade: 1,
          observacoes: 'none',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(items);

      expect(await controller.findAll()).toEqual(items);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no items found', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new NotFoundException());

      await expect(controller.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return an item by id', async () => {
      const item = {
        id: 1,
        id_pedido: 1,
        id_produto: 1,
        quantidade: 1,
        observacoes: 'none',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(item);

      expect(await controller.findOne(1)).toEqual(item);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if item not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateItensDoPedidoDto: UpdateItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 2,
        observacoes: 'updated',
      };
      const result = {
        id: 1,
        id_pedido: updateItensDoPedidoDto.id_pedido,
        id_produto: updateItensDoPedidoDto.id_produto,
        quantidade: updateItensDoPedidoDto.quantidade,
        observacoes: updateItensDoPedidoDto.observacoes,
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, updateItensDoPedidoDto)).toEqual(
        result,
      );
      expect(service.update).toHaveBeenCalledWith(1, updateItensDoPedidoDto);
    });

    it('should throw NotFoundException if item, pedido, or produto not found', async () => {
      const updateItensDoPedidoDto: UpdateItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 2,
        observacoes: 'updated',
      };

      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(
        controller.update(1, updateItensDoPedidoDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete an item', async () => {
      const result = {
        id: 1,
        id_pedido: 1,
        id_produto: 1,
        quantidade: 1,
        observacoes: 'none',
      };

      jest.spyOn(service, 'delete').mockResolvedValue(result);

      expect(await controller.delete(1)).toEqual(result);
      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if item to delete not found', async () => {
      jest.spyOn(service, 'delete').mockRejectedValue(new NotFoundException());

      await expect(controller.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
