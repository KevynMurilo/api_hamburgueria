import { Test, TestingModule } from '@nestjs/testing';
import { MesaService } from './mesa.service';
import { MesaRepository } from './mesa.repository';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { StatusMesa } from '@prisma/client';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateMesaDto } from './dto/update-mesa.dto';

describe('MesaService', () => {
  let service: MesaService;
  let repository: MesaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MesaService,
        {
          provide: MesaRepository,
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

    service = module.get<MesaService>(MesaService);
    repository = module.get<MesaRepository>(MesaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new mesa', async () => {
      const createMesaDto: CreateMesaDto = {
        numero: 1,
        status: 'disponivel',
      };

      const mockCreatedMesa = {
        id: 1,
        ...createMesaDto,
      };

      (repository.create as jest.Mock).mockResolvedValue(mockCreatedMesa);

      const result = await service.create(createMesaDto);

      expect(result).toEqual(mockCreatedMesa);
      expect(repository.create).toHaveBeenCalledWith(createMesaDto);
    });

    it('should throw ConflictException if mesa already exists', async () => {
      const createMesaDto: CreateMesaDto = {
        numero: 1,
        status: 'disponivel',
      };

      const mockExistingMesa = {
        id: 1,
        ...createMesaDto,
      };

      (repository.findOne as jest.Mock).mockResolvedValue(mockExistingMesa);

      await expect(service.create(createMesaDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of garcons if they exist', async () => {
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

      (repository.findAll as jest.Mock).mockResolvedValue(mesas);

      const result = await service.findAll();

      expect(result).toEqual(mesas);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  it('should throw NotFoundException if no mesas are found', async () => {
    (repository.findAll as jest.Mock).mockResolvedValue([]);

    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });

  describe('findOne', () => {
    it('should return a mesa if it exists', async () => {
      const mockMesa = {
        id: 1,
        numero: 1,
        status: StatusMesa.disponivel,
      };

      (repository.findOne as jest.Mock).mockResolvedValue(mockMesa);
      const result = await service.findOne(1);
      expect(result).toEqual(mockMesa);
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if mesa does not exist', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update mesa status', async () => {
      const numero = 1;
      const updateMesaDto: UpdateMesaDto = {
        status: StatusMesa.ocupada,
      };

      const mockExistingMesa = {
        id: 1,
        numero: 1,
        status: StatusMesa.disponivel,
      };

      const updatedMesa = {
        id: 1,
        numero: 1,
        status: StatusMesa.ocupada,
      };

      (repository.findOne as jest.Mock).mockResolvedValue(mockExistingMesa);
      (repository.update as jest.Mock).mockResolvedValue(updatedMesa);

      const result = await service.update(numero, updateMesaDto);

      expect(result).toEqual(updatedMesa);
      expect(repository.findOne).toHaveBeenCalledWith(numero);
      expect(repository.update).toHaveBeenCalledWith(numero, updateMesaDto);
    });

    it('should throw NotFoundException if mesa does not exist', async () => {
      const numero = 1;
      const updateMesaDto: UpdateMesaDto = {
        status: StatusMesa.ocupada,
      };

      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.update(numero, updateMesaDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findOne).toHaveBeenCalledWith(numero);
      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a mesa if it exists', async () => {
      const mockMesa = {
        id: 1,
        numero: 1,
        status: StatusMesa.disponivel,
      };

      (repository.findOne as jest.Mock).mockResolvedValue(mockMesa);
      (repository.delete as jest.Mock).mockResolvedValue(mockMesa);

      const result = await service.delete(1);

      expect(result).toEqual({ message: `Mesa 1 deletada com sucesso` });
      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if mesa does not exist', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
