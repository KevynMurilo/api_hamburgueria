import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoCategoriaService } from './produto-categoria.service';
import { ProdutoCategoriaRepository } from './produto-categoria.repository';
import { ProdutoService } from '../produto/produto.service';
import { CategoriaService } from '../categoria/categoria.service';
import { CreateProdutoCategoriaDto } from './dto/create-produto-categoria.dto';
import { DeleteProdutoCategoriaDto } from './dto/delete-produto-categoria.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProdutoCategoriaService', () => {
  let service: ProdutoCategoriaService;
  let produtoCategoriaRepository: ProdutoCategoriaRepository;
  let produtoService: ProdutoService;
  let categoriaService: CategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoCategoriaService,
        {
          provide: ProdutoCategoriaRepository,
          useValue: {
            create: jest.fn(),
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

    service = module.get<ProdutoCategoriaService>(ProdutoCategoriaService);
    produtoCategoriaRepository = module.get<ProdutoCategoriaRepository>(
      ProdutoCategoriaRepository,
    );
    produtoService = module.get<ProdutoService>(ProdutoService);
    categoriaService = module.get<CategoriaService>(CategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new produto-categoria association', async () => {
      const createProdutoCategoriaDto: CreateProdutoCategoriaDto = {
        id_produto: 1,
        id_categoria: [1, 2],
      };

      jest.spyOn(produtoService, 'findOne').mockResolvedValue({
        id: 1,
        nome: 'Produto 1',
        descricao: 'Descrição do produto',
        preco: 100,
      });
      jest
        .spyOn(categoriaService, 'findOne')
        .mockResolvedValue({ id: 1, nome: 'Categoria 1' });
      jest
        .spyOn(produtoCategoriaRepository, 'create')
        .mockResolvedValue({ count: 2 });

      const result = await service.create(createProdutoCategoriaDto);

      expect(produtoService.findOne).toHaveBeenCalledWith(1);
      expect(categoriaService.findOne).toHaveBeenCalledWith(1);
      expect(produtoCategoriaRepository.create).toHaveBeenCalledWith(
        createProdutoCategoriaDto,
      );
      expect(result).toEqual({ count: 2 });
    });

    it('should throw NotFoundException if produto not found', async () => {
      const createProdutoCategoriaDto: CreateProdutoCategoriaDto = {
        id_produto: 1,
        id_categoria: [1, 2],
      };

      jest
        .spyOn(produtoService, 'findOne')
        .mockRejectedValue(new NotFoundException('Produto não encontrado'));

      await expect(service.create(createProdutoCategoriaDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(produtoService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('delete', () => {
    it('should delete a produto-categoria association', async () => {
      const deleteProdutoCategoriaDto: DeleteProdutoCategoriaDto = {
        id_produto: 1,
        id_categoria: 1,
      };

      jest.spyOn(produtoService, 'findOne').mockResolvedValue({
        id: 1,
        nome: 'Produto 1',
        descricao: 'Descrição do produto',
        preco: 100,
      });
      jest
        .spyOn(categoriaService, 'findOne')
        .mockResolvedValue({ id: 1, nome: 'Categoria 1' });
      jest
        .spyOn(produtoCategoriaRepository, 'delete')
        .mockResolvedValue({ id_produto: 1, id_categoria: 1 });

      const result = await service.delete(deleteProdutoCategoriaDto);

      expect(produtoService.findOne).toHaveBeenCalledWith(1);
      expect(categoriaService.findOne).toHaveBeenCalledWith(1);
      expect(produtoCategoriaRepository.delete).toHaveBeenCalledWith(
        deleteProdutoCategoriaDto,
      );
      expect(result).toEqual({ id_produto: 1, id_categoria: 1 });
    });

    it('should throw NotFoundException if produto not found', async () => {
      const deleteProdutoCategoriaDto: DeleteProdutoCategoriaDto = {
        id_produto: 1,
        id_categoria: 1,
      };

      jest
        .spyOn(produtoService, 'findOne')
        .mockRejectedValue(new NotFoundException('Produto não encontrado'));

      await expect(service.delete(deleteProdutoCategoriaDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(produtoService.findOne).toHaveBeenCalledWith(1);
    });
  });
});
