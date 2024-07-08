import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoHasCategoriaService } from './produto-has-categoria.service';
import { ProdutoHasCategoriaRepository } from './produto-has-categoria.repository';
import { CategoriaService } from '../categoria/categoria.service';
import { ProdutoCategoriaDto } from './dto/produto-categoria.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ProdutoHasCategoriaService', () => {
  let service: ProdutoHasCategoriaService;
  let produtoHasCategoriaRepository: ProdutoHasCategoriaRepository;
  let categoriaService: CategoriaService;

  const dto: ProdutoCategoriaDto = { id_produto: 1, id_categoria: 2 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoHasCategoriaService,
        {
          provide: ProdutoHasCategoriaRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: CategoriaService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProdutoHasCategoriaService>(
      ProdutoHasCategoriaService,
    );
    produtoHasCategoriaRepository = module.get<ProdutoHasCategoriaRepository>(
      ProdutoHasCategoriaRepository,
    );
    categoriaService = module.get<CategoriaService>(CategoriaService);
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create a product-category link', async () => {
      categoriaService.findOne = jest.fn().mockResolvedValue({});
      produtoHasCategoriaRepository.findOne = jest.fn().mockResolvedValue(null);
      produtoHasCategoriaRepository.create = jest.fn().mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(result).toEqual(dto);
      expect(produtoHasCategoriaRepository.findOne).toHaveBeenCalledWith(dto);
      expect(categoriaService.findOne).toHaveBeenCalledWith(dto.id_categoria);
      expect(produtoHasCategoriaRepository.create).toHaveBeenCalledWith(dto);
    });

    it('should throw ConflictException if link already exists', async () => {
      produtoHasCategoriaRepository.findOne = jest.fn().mockResolvedValue(dto);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should find a product-category link', async () => {
      produtoHasCategoriaRepository.findOne = jest.fn().mockResolvedValue(dto);

      const result = await service.findOne(dto);
      expect(result).toEqual(dto);
      expect(produtoHasCategoriaRepository.findOne).toHaveBeenCalledWith(dto);
    });

    it('should throw NotFoundException if link not found', async () => {
      produtoHasCategoriaRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.findOne(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a product-category link', async () => {
      categoriaService.findOne = jest.fn().mockResolvedValue({});
      produtoHasCategoriaRepository.delete = jest.fn().mockResolvedValue(dto);

      const result = await service.delete(dto);
      expect(result).toEqual(dto);
      expect(categoriaService.findOne).toHaveBeenCalledWith(dto.id_categoria);
      expect(produtoHasCategoriaRepository.delete).toHaveBeenCalledWith(dto);
    });

    it('should throw NotFoundException if category not found', async () => {
      categoriaService.findOne = jest
        .fn()
        .mockRejectedValue(new NotFoundException());

      await expect(service.delete(dto)).rejects.toThrow(NotFoundException);
    });
  });
});
