import { Test, TestingModule } from '@nestjs/testing';
import { PedidoService } from './pedido.service';
import { PedidoRepository } from './pedido.repository';
import { NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { MesaService } from '../mesa/mesa.service';
import { GarcomService } from '../garcom/garcom.service';

describe('PedidoService', () => {
  let service: PedidoService;
  let pedidoRepository: PedidoRepository;
  let mesaService: MesaService;
  let garcomService: GarcomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoService,
        {
          provide: PedidoRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
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
      ],
    }).compile();

    service = module.get<PedidoService>(PedidoService);
    pedidoRepository = module.get<PedidoRepository>(PedidoRepository);
    mesaService = module.get<MesaService>(MesaService);
    garcomService = module.get<GarcomService>(GarcomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new pedido', async () => {
      const createPedidoDto: CreatePedidoDto = {
        status: 'preparo',
        numero_mesa: 1,
        id_garcom: 1,
      };
      const createdPedido = {
        id: 1,
        ...createPedidoDto,
      };

      jest.spyOn(mesaService, 'findOne').mockResolvedValue(null);
      jest.spyOn(garcomService, 'findOneById').mockResolvedValue(null);
      jest
        .spyOn(pedidoRepository, 'create')
        .mockResolvedValue(createdPedido as any);

      const result = await service.create(createPedidoDto);

      expect(result).toEqual(createdPedido);
      expect(mesaService.findOne).toHaveBeenCalledWith(
        createPedidoDto.numero_mesa,
      );
      expect(garcomService.findOneById).toHaveBeenCalledWith(
        createPedidoDto.id_garcom,
      );
      expect(pedidoRepository.create).toHaveBeenCalledWith(createPedidoDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of pedidos', async () => {
      const pedidos = [
        { id: 1, status: 'preparo', numero_mesa: 1, id_garcom: 1 },
        { id: 2, status: 'preparo', numero_mesa: 2, id_garcom: 2 },
      ];

      jest.spyOn(pedidoRepository, 'findAll').mockResolvedValue(pedidos as any);

      const result = await service.findAll();

      expect(result).toEqual(pedidos);
      expect(pedidoRepository.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no pedidos are found', async () => {
      jest.spyOn(pedidoRepository, 'findAll').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
      expect(pedidoRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the pedido if found', async () => {
      const id = 1;
      const pedido = { id, status: 'preparo', numero_mesa: 1, id_garcom: 1 };

      jest.spyOn(pedidoRepository, 'findOne').mockResolvedValue(pedido as any);

      const result = await service.findOne(id);

      expect(result).toEqual(pedido);
      expect(pedidoRepository.findOne).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if pedido is not found', async () => {
      const id = 999;

      jest.spyOn(pedidoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
      expect(pedidoRepository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update the pedido', async () => {
      const id = 1;
      const updatePedidoDto: UpdatePedidoDto = {
        status: 'pronto',
        numero_mesa: 2,
        id_garcom: 2,
      };
      const updatedPedido = { id, ...updatePedidoDto };

      jest.spyOn(mesaService, 'findOne').mockResolvedValue(null);
      jest.spyOn(garcomService, 'findOneById').mockResolvedValue(null);
      jest
        .spyOn(pedidoRepository, 'update')
        .mockResolvedValue(updatedPedido as any);

      const result = await service.update(id, updatePedidoDto);

      expect(result).toEqual(updatedPedido);
      expect(mesaService.findOne).toHaveBeenCalledWith(
        updatePedidoDto.numero_mesa,
      );
      expect(garcomService.findOneById).toHaveBeenCalledWith(
        updatePedidoDto.id_garcom,
      );
      expect(pedidoRepository.update).toHaveBeenCalledWith(id, updatePedidoDto);
    });
  });

  describe('delete', () => {
    it('should delete the pedido', async () => {
      const id = 1;
      const deletedMessage = { message: 'Pedido deletado com sucesso' };

      jest.spyOn(pedidoRepository, 'findOne').mockResolvedValue({ id } as any);
      jest.spyOn(pedidoRepository, 'delete').mockResolvedValue({} as any);

      const result = await service.delete(id);

      expect(result).toEqual(deletedMessage);
      expect(pedidoRepository.findOne).toHaveBeenCalledWith(id);
      expect(pedidoRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if pedido does not exist', async () => {
      const id = 999;

      jest.spyOn(pedidoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.delete(id)).rejects.toThrow(NotFoundException);
      expect(pedidoRepository.findOne).toHaveBeenCalledWith(id);
      expect(pedidoRepository.delete).not.toHaveBeenCalled();
    });
  });
});
