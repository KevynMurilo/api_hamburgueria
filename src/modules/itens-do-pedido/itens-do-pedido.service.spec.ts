import { Test, TestingModule } from '@nestjs/testing';
import { ItensDoPedidoService } from './itens-do-pedido.service';
import { ItensDoPedidoRepository } from './itens-do-pedido.repository';
import { ProdutoService } from '../produto/produto.service';
import { NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('ItensDoPedidoService', () => {
  let service: ItensDoPedidoService;
  let repository: ItensDoPedidoRepository;
  let produtoService: ProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItensDoPedidoService,
        {
          provide: ItensDoPedidoRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ProdutoService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItensDoPedidoService>(ItensDoPedidoService);
    repository = module.get<ItensDoPedidoRepository>(ItensDoPedidoRepository);
    produtoService = module.get<ProdutoService>(ProdutoService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um item do pedido', async () => {
      const createItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 1,
        observacoes: 'none',
      };
      const result = { id: 1, ...createItensDoPedidoDto };

      (produtoService.findOne as jest.Mock).mockResolvedValue({});
      (repository.create as jest.Mock).mockResolvedValue(result);

      const trx = {} as Prisma.TransactionClient;
      expect(await service.create(trx, createItensDoPedidoDto)).toEqual(result);
      expect(produtoService.findOne).toHaveBeenCalledWith(1);
      expect(repository.create).toHaveBeenCalledWith(
        trx,
        createItensDoPedidoDto,
      );
    });

    it('deve lançar NotFoundException se produto não for encontrado', async () => {
      const createItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 1,
        observacoes: 'none',
      };

      (produtoService.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('Produto não encontrado'),
      );

      const trx = {} as Prisma.TransactionClient;
      await expect(service.create(trx, createItensDoPedidoDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(produtoService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findAll', () => {
    it('deve retornar um array de itens', async () => {
      const items = [{ id: 1 }, { id: 2 }];
      (repository.findAll as jest.Mock).mockResolvedValue(items);

      const result = await service.findAll();
      expect(result).toEqual(items);
    });

    it('deve lançar NotFoundException se nenhum item for encontrado', async () => {
      (repository.findAll as jest.Mock).mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('deve retornar um item pelo id', async () => {
      const item = { id: 1 };
      (repository.findOne as jest.Mock).mockResolvedValue(item);

      const result = await service.findOne(1);
      expect(result).toEqual(item);
    });

    it('deve lançar NotFoundException se o item não for encontrado', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve atualizar um item', async () => {
      const updateItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 2,
        observacoes: 'updated',
      };
      const item = { id: 1, ...updateItensDoPedidoDto };

      (repository.findOne as jest.Mock).mockResolvedValue(item);
      (produtoService.findOne as jest.Mock).mockResolvedValue({});
      (repository.update as jest.Mock).mockResolvedValue(item);

      const result = await service.update(1, updateItensDoPedidoDto);
      expect(result).toEqual(item);
    });

    it('deve lançar NotFoundException se o item a ser atualizado não for encontrado', async () => {
      const updateItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 2,
        observacoes: 'updated',
      };

      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.update(1, updateItensDoPedidoDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar NotFoundException se produto não for encontrado ao atualizar', async () => {
      const updateItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 2,
        observacoes: 'updated',
      };
      const item = { id: 1, ...updateItensDoPedidoDto };

      (repository.findOne as jest.Mock).mockResolvedValue(item);
      (produtoService.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('Produto não encontrado'),
      );

      await expect(service.update(1, updateItensDoPedidoDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(produtoService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('delete', () => {
    it('deve deletar um item', async () => {
      const item = { id: 1 };

      (repository.findOne as jest.Mock).mockResolvedValue(item);
      (repository.delete as jest.Mock).mockResolvedValue(item);

      const result = await service.delete(1);
      expect(result).toEqual(item);
    });

    it('deve lançar NotFoundException se o item a ser deletado não for encontrado', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
