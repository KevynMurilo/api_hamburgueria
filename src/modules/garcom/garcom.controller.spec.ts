import { Test, TestingModule } from '@nestjs/testing';
import { GarcomController } from './garcom.controller';
import { GarcomService } from './garcom.service';
import { CreateGarcomDto } from './dto/create-garcom.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('GarcomController', () => {
  let controller: GarcomController;
  let service: GarcomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GarcomController],
      providers: [
        {
          provide: GarcomService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GarcomController>(GarcomController);
    service = module.get<GarcomService>(GarcomService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new garcom', async () => {
      const createGarcomDto: CreateGarcomDto = {
        email: 'test@example.com',
        nome: 'Test',
        senha: 'password123',
      };
      const createdGarcom = {
        id: 1,
        ...createGarcomDto,
        senha: 'hashedPassword123',
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdGarcom);

      const result = await controller.create(createGarcomDto);

      expect(result).toEqual(createdGarcom);
      expect(service.create).toHaveBeenCalledWith(createGarcomDto);
    });

    it('should throw ConflictException if email already exists', async () => {
      const createGarcomDto: CreateGarcomDto = {
        email: 'test@example.com',
        nome: 'Test',
        senha: 'password123',
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new ConflictException('Email já cadastrado'));

      await expect(controller.create(createGarcomDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of garcons', async () => {
      const garcons = [
        {
          id: 1,
          nome: 'Garcom1',
          email: 'garcom1@example.com',
          senha: 'hashedPassword1',
        },
        {
          id: 2,
          nome: 'Garcom2',
          email: 'garcom2@example.com',
          senha: 'hashedPassword2',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(garcons);

      const result = await controller.findAll();

      expect(result).toEqual(garcons);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no garcons are found', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new NotFoundException('Nenhum garçon encontrado'));

      await expect(controller.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a garcom if it exists', async () => {
      const mockMessage = { message: `Garçom Garcom1 deletado com sucesso` };

      jest.spyOn(service, 'delete').mockResolvedValue(mockMessage);

      const result = await controller.delete(1);

      expect(result).toEqual(mockMessage);
      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if garcom does not exists', async () => {
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(new NotFoundException('Nenhum garçom encontrado'));

      await expect(controller.delete(1)).rejects.toThrow(NotFoundException);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
