import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoHasCategoriaService } from './produto-has-categoria.service';
import { ProdutoHasCategoriaRepository } from './produto-has-categoria.repository';
import { ProdutoService } from '../produto/produto.service';
import { CategoriaService } from '../categoria/categoria.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ProdutoCategoriaDto } from './dto/produto-categoria.dto';

describe('ProdutoHasCategoriaService', () => {
  let service: ProdutoHasCategoriaService;
  let produtoHasCategoriaRepository: ProdutoHasCategoriaRepository;
  let produtoService: ProdutoService;
  let categoriaService: CategoriaService;

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
          provide: ProdutoService,
          useValue: {
            findOne: jest.fn(),
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
    produtoService = module.get<ProdutoService>(ProdutoService);
    categoriaService = module.get<CategoriaService>(CategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product-category link', async () => {
      const dto: ProdutoCategoriaDto = { id_produto: 1, id_categoria: 1 };
      jest
        .spyOn(produtoHasCategoriaRepository, 'findOne')
        .mockResolvedValue(null);
      jest.spyOn(produtoService, 'findOne').mockResolvedValue(null);
      jest.spyOn(categoriaService, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(produtoHasCategoriaRepository, 'create')
        .mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(result).toEqual(dto);
      expect(produtoHasCategoriaRepository.findOne).toHaveBeenCalledWith(dto);
      expect(produtoService.findOne).toHaveBeenCalledWith(dto.id_produto);
      expect(categoriaService.findOne).toHaveBeenCalledWith(dto.id_categoria);
      expect(produtoHasCategoriaRepository.create).toHaveBeenCalledWith(dto);
    });

    it('should throw ConflictException if link already exists', async () => {
      const dto: ProdutoCategoriaDto = { id_produto: 1, id_categoria: 1 };
      jest
        .spyOn(produtoHasCategoriaRepository, 'findOne')
        .mockResolvedValue(dto);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should find a product-category link', async () => {
      const dto: ProdutoCategoriaDto = { id_produto: 1, id_categoria: 1 };
      jest
        .spyOn(produtoHasCategoriaRepository, 'findOne')
        .mockResolvedValue(dto);

      const result = await service.findOne(dto);
      expect(result).toEqual(dto);
      expect(produtoHasCategoriaRepository.findOne).toHaveBeenCalledWith(dto);
    });

    it('should throw NotFoundException if link not found', async () => {
      const dto: ProdutoCategoriaDto = { id_produto: 1, id_categoria: 1 };
      jest
        .spyOn(produtoHasCategoriaRepository, 'findOne')
        .mockResolvedValue(null);

      await expect(service.findOne(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a product-category link', async () => {
      const dto: ProdutoCategoriaDto = { id_produto: 1, id_categoria: 1 };
      jest.spyOn(produtoService, 'findOne').mockResolvedValue(null);
      jest.spyOn(categoriaService, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(produtoHasCategoriaRepository, 'delete')
        .mockResolvedValue(dto);

      const result = await service.delete(dto);
      expect(result).toEqual(dto);
      expect(produtoService.findOne).toHaveBeenCalledWith(dto.id_produto);
      expect(categoriaService.findOne).toHaveBeenCalledWith(dto.id_categoria);
      expect(produtoHasCategoriaRepository.delete).toHaveBeenCalledWith(dto);
    });

    it('should throw NotFoundException if product or category not found', async () => {
      const dto: ProdutoCategoriaDto = { id_produto: 1, id_categoria: 1 };
      jest
        .spyOn(produtoService, 'findOne')
        .mockRejectedValue(new NotFoundException());

      await expect(service.delete(dto)).rejects.toThrow(NotFoundException);
    });
  });
});
