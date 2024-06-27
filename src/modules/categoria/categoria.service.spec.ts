import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaService } from './categoria.service';
import { CategoriaRepository } from './categoria.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let repository: CategoriaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriaService,
        {
          provide: CategoriaRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByName: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriaService>(CategoriaService);
    repository = module.get<CategoriaRepository>(CategoriaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new categoria', async () => {
      const createCategoriaDto: CreateCategoriaDto = {
        nome: 'Categoria Teste',
      };
      const mockCategoria = { id: 1, ...createCategoriaDto };

      jest.spyOn(repository, 'findByName').mockResolvedValueOnce(null);
      jest
        .spyOn(repository, 'create')
        .mockResolvedValueOnce(mockCategoria as any);

      const result = await service.create(createCategoriaDto);
      expect(result).toEqual(mockCategoria);
    });

    it('should throw ConflictException if categoria name already exists', async () => {
      const createCategoriaDto: CreateCategoriaDto = {
        nome: 'Categoria Teste',
      };
      const mockCategoria = { id: 1, ...createCategoriaDto };

      jest
        .spyOn(repository, 'findByName')
        .mockResolvedValueOnce(mockCategoria as any);

      await expect(service.create(createCategoriaDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    it('should update the categoria', async () => {
      const mockCategoria = { id: 1, nome: 'Categoria Teste' };
      const updatedCategoria = { ...mockCategoria, nome: 'Nova Categoria' };

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(mockCategoria as any);
      jest.spyOn(repository, 'findByName').mockResolvedValueOnce(null);
      jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce(updatedCategoria as any);

      const result = await service.update(mockCategoria.id, 'Nova Categoria');
      expect(result).toEqual(updatedCategoria);
    });

    it('should throw NotFoundException if categoria is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.update(999, 'Nova Categoria')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if categoria name already exists', async () => {
      const mockCategoria = { id: 1, nome: 'Categoria Teste' };
      const existingCategoria = { id: 2, nome: 'Nova Categoria' };

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(mockCategoria as any);
      jest
        .spyOn(repository, 'findByName')
        .mockResolvedValueOnce(existingCategoria as any);

      await expect(
        service.update(mockCategoria.id, 'Nova Categoria'),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of categorias', async () => {
      const mockCategorias = [
        { id: 1, nome: 'Categoria 1' },
        { id: 2, nome: 'Categoria 2' },
      ];

      jest
        .spyOn(repository, 'findAll')
        .mockResolvedValueOnce(mockCategorias as any);

      const result = await service.findAll();
      expect(result).toEqual(mockCategorias);
    });

    it('should throw NotFoundException if no categorias are found', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValueOnce([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return the found categoria', async () => {
      const mockCategoria = { id: 1, nome: 'Categoria Teste' };

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(mockCategoria as any);

      const result = await service.findOne(mockCategoria.id);
      expect(result).toEqual(mockCategoria);
    });

    it('should throw NotFoundException if categoria is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete the categoria', async () => {
      const mockCategoria = { id: 1, nome: 'Categoria Teste' };

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(mockCategoria as any);
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValueOnce(mockCategoria as any);

      const result = await service.delete(mockCategoria.id);
      expect(result).toEqual({
        message: `Categoria ${mockCategoria.nome} deletado com sucesso`,
      });
    });

    it('should throw NotFoundException if categoria is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});
