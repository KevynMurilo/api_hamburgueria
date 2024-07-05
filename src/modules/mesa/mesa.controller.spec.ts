import { Test, TestingModule } from '@nestjs/testing';
import { MesaController } from './mesa.controller';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { StatusMesa } from '@prisma/client';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('MesaController', () => {
  let controller: MesaController;
  let service: MesaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MesaController],
      providers: [
        {
          provide: MesaService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MesaController>(MesaController);
    service = module.get<MesaService>(MesaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new mesa', async () => {
      const createMesaDto: CreateMesaDto = {
        numero: 1,
        status: 'disponivel',
      };

      const mockCreateMesa = {
        id: 1,
        ...createMesaDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockCreateMesa);

      const result = await controller.create(createMesaDto);

      expect(result).toEqual(mockCreateMesa);
      expect(service.create).toHaveBeenCalledWith(createMesaDto);
    });

    it('should throw ConflictException if mesa already exists', async () => {
      const createMesaDto: CreateMesaDto = {
        numero: 1,
        status: 'disponivel',
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new ConflictException('Mesa já registrada'));

      await expect(controller.create(createMesaDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of mesas', async () => {
      const mesas = [
        {
          id: 1,
          numero: 1,
          status: StatusMesa.disponivel,
        },
        {
          id: 2,
          numero: 2,
          status: StatusMesa.ocupada,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mesas);

      const result = await controller.findAll();

      expect(result).toEqual(mesas);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no mesas are found', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new NotFoundException('Nenhuma mesa cadastrada'));

      await expect(controller.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a mesa if it exists', async () => {
      const mockMesa = {
        id: 1,
        numero: 1,
        status: StatusMesa.disponivel,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockMesa);

      const result = await controller.findOne(1);

      expect(result).toEqual(mockMesa);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if mesa does not exist', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new NotFoundException('Mesa não encontrada'));

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a mesa if it exists', async () => {
      const mockMessage = { message: `Mesa 1 deletada com sucesso` };

      jest.spyOn(service, 'delete').mockResolvedValue(mockMessage);

      const result = await controller.delete(1);

      expect(result).toEqual(mockMessage);
      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if mesa does not exist', async () => {
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(new NotFoundException('Mesa não encontrada'));

      await expect(controller.delete(1)).rejects.toThrow(NotFoundException);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
