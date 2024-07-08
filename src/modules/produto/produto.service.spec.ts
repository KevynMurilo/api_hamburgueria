import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { ProdutoRepository } from './produto.repository';
import { ProdutoHasCategoriaService } from '../produto-has-categoria/produto-has-categoria.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateProdutoDto } from './dto/update-produto.dto';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let repository: ProdutoRepository;
  let produtoHasCategoriaService: ProdutoHasCategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: ProdutoRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ProdutoHasCategoriaService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
    repository = module.get<ProdutoRepository>(ProdutoRepository);
    produtoHasCategoriaService = module.get<ProdutoHasCategoriaService>(
      ProdutoHasCategoriaService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new produto', async () => {
      const createProdutoDto: CreateProdutoDto = {
        nome: 'Produto teste',
        descricao: 'Descricao teste',
        preco: 7.2,
        ids_categorias: [1, 2],
      };

      const mockProduto = {
        id: 1,
        nome: 'Produto teste',
        descricao: 'Descricao teste',
        preco: 7.2,
        produtoCategoria: [
          { categoria: { nome: 'Categoria 1' } },
          { categoria: { nome: 'Categoria 2' } },
        ],
      };

      const mockCategoria = { id_produto: 1, id_categoria: 1 };
      jest.spyOn(repository, 'create').mockResolvedValue(mockProduto);
      jest
        .spyOn(produtoHasCategoriaService, 'create')
        .mockResolvedValue(mockCategoria);

      const result = await service.create(createProdutoDto);
      expect(result).toEqual({
        produto: mockProduto,
        categorias: [mockCategoria, mockCategoria],
      });
      expect(repository.create).toHaveBeenCalledWith(createProdutoDto);
      expect(produtoHasCategoriaService.create).toHaveBeenCalledTimes(2);
    });
  });

  // Outros testes permanecem os mesmos

  describe('findAll', () => {
    it('should return an array of produtos', async () => {
      const mockProdutos = [
        {
          id: 1,
          nome: 'Produto teste',
          descricao: 'Descricao teste',
          preco: 7.2,
          produtoCategoria: [
            { categoria: { nome: 'Categoria 1' } },
            { categoria: { nome: 'Categoria 2' } },
          ],
        },
      ];

      jest.spyOn(repository, 'findAll').mockResolvedValue(mockProdutos);

      const result = await service.findAll();
      expect(result).toEqual(mockProdutos);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no produtos are found', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a produto if found', async () => {
      const mockProduto = {
        id: 1,
        nome: 'Produto teste',
        descricao: 'Descricao teste',
        preco: 7.2,
        produtoCategoria: [
          { categoria: { nome: 'Categoria 1' } },
          { categoria: { nome: 'Categoria 2' } },
        ],
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockProduto);

      const result = await service.findOne(1);
      expect(result).toEqual(mockProduto);
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if the produto is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a produto successfully', async () => {
      const updateProdutoDto: UpdateProdutoDto = {
        nome: 'Produto atualizado',
        ids_categorias: [1, 2],
      };
      const mockProduto = {
        id: 1,
        nome: 'Produto atualizado',
        descricao: 'Descricao original',
        preco: 7.2,
        produtoCategoria: [
          { categoria: { nome: 'Categoria 1' } },
          { categoria: { nome: 'Categoria 2' } },
        ],
      };

      jest.spyOn(repository, 'update').mockResolvedValue(mockProduto);

      const result = await service.update(1, updateProdutoDto);
      expect(result).toEqual({
        message: `Produto ${mockProduto.nome} atualizado com sucesso`,
      });
      expect(repository.update).toHaveBeenCalledWith(1, updateProdutoDto);
    });
  });

  describe('delete', () => {
    it('should delete a produto successfully', async () => {
      const mockProduto = {
        id: 1,
        nome: 'Produto deletado',
        descricao: 'Descricao deletada',
        preco: 7.2,
        produtoCategoria: [],
      };

      jest.spyOn(repository, 'delete').mockResolvedValue(mockProduto);

      const result = await service.delete(1);
      expect(result).toEqual({
        message: `Produto ${mockProduto.nome} deletado com sucesso`,
      });
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
