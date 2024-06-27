import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('CategoriaController', () => {
  let controller: CategoriaController;
  let service: CategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaController],
      providers: [
        {
          provide: CategoriaService,
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

    controller = module.get<CategoriaController>(CategoriaController);
    service = module.get<CategoriaService>(CategoriaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new categoria', async () => {
      const createCategoriaDto: CreateCategoriaDto = {
        nome: 'Teste',
      };
      const createdCategoria = {
        id: 1,
        ...createCategoriaDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdCategoria);

      const result = await controller.create(createCategoriaDto);

      expect(result).toEqual(createdCategoria);
      expect(service.create).toHaveBeenCalledWith(createCategoriaDto);
    });

    it('should throw ConflictException if categoria name already exists', async () => {
      const createCategoriaDto: CreateCategoriaDto = {
        nome: 'Teste',
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new ConflictException('Nome já cadastrado'));

      await expect(controller.create(createCategoriaDto)).rejects.toThrow(
        ConflictException,
      );
      expect(service.create).toHaveBeenCalledWith(createCategoriaDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categorias', async () => {
      const categorias = [
        { id: 1, nome: 'Categoria1' },
        { id: 2, nome: 'Categoria2' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(categorias);

      const result = await controller.findAll();

      expect(result).toEqual(categorias);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no categorias are found', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(
          new NotFoundException('Nenhuma categoria encontrada'),
        );

      await expect(controller.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update the categoria', async () => {
      const mockCategoria = { id: 1, nome: 'Categoria Teste' };
      const updatedCategoria = { ...mockCategoria, nome: 'Nova Categoria' };

      jest.spyOn(service, 'update').mockResolvedValue(updatedCategoria);

      const result = await controller.update(
        mockCategoria.id,
        'Nova Categoria',
      );

      expect(result).toEqual(updatedCategoria);
      expect(service.update).toHaveBeenCalledWith(
        mockCategoria.id,
        'Nova Categoria',
      );
    });

    it('should throw ConflictException if categoria name already exists', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new ConflictException('Nome já cadastrado'));

      await expect(controller.update(1, 'Nova Categoria')).rejects.toThrow(
        ConflictException,
      );
      expect(service.update).toHaveBeenCalledWith(1, 'Nova Categoria');
    });

    it('should throw NotFoundException if categoria is not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('Categoria não encontrada'));

      await expect(controller.update(999, 'Nova Categoria')).rejects.toThrow(
        NotFoundException,
      );
      expect(service.update).toHaveBeenCalledWith(999, 'Nova Categoria');
    });
  });

  describe('delete', () => {
    it('should delete a categoria if it exists', async () => {
      const mockMessage = {
        message: `Categoria Categoria1 deletado com sucesso`,
      };

      jest.spyOn(service, 'delete').mockResolvedValue(mockMessage);

      const result = await controller.delete(1);

      expect(result).toEqual(mockMessage);
      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if categoria does not exist', async () => {
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(new NotFoundException('Categoria não encontrada'));

      await expect(controller.delete(1)).rejects.toThrow(NotFoundException);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
