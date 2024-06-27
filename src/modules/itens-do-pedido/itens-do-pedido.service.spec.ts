import { Test, TestingModule } from '@nestjs/testing';
import { ItensDoPedidoService } from './itens-do-pedido.service';
import { ItensDoPedidoRepository } from './itens-do-pedido.repository';
import { PedidoService } from '../pedido/pedido.service';
import { ProdutoService } from '../produto/produto.service';
import { NotFoundException } from '@nestjs/common';

describe('ItensDoPedidoService', () => {
  let service: ItensDoPedidoService;
  let repository: ItensDoPedidoRepository;
  let pedidoService: PedidoService;
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
          provide: PedidoService,
          useValue: {
            findOne: jest.fn(),
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
    pedidoService = module.get<PedidoService>(PedidoService);
    produtoService = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an item of order', async () => {
      const createItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 1,
        observacoes: 'none',
      };
      const result = { id: 1, ...createItensDoPedidoDto };

      (pedidoService.findOne as jest.Mock).mockResolvedValue({});
      (produtoService.findOne as jest.Mock).mockResolvedValue({});
      (repository.create as jest.Mock).mockResolvedValue(result);

      expect(await service.create(createItensDoPedidoDto)).toEqual(result);
      expect(pedidoService.findOne).toHaveBeenCalledWith(1);
      expect(produtoService.findOne).toHaveBeenCalledWith(1);
      expect(repository.create).toHaveBeenCalledWith(createItensDoPedidoDto);
    });

    it('should throw NotFoundException if pedido not found', async () => {
      const createItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 1,
        observacoes: 'none',
      };

      (pedidoService.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('Pedido não encontrada'),
      );

      await expect(service.create(createItensDoPedidoDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(pedidoService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if produto not found', async () => {
      const createItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 1,
        observacoes: 'none',
      };

      (pedidoService.findOne as jest.Mock).mockResolvedValue({});
      (produtoService.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('Produto não encontrado'),
      );

      await expect(service.create(createItensDoPedidoDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(produtoService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const items = [{ id: 1 }, { id: 2 }];
      (repository.findAll as jest.Mock).mockResolvedValue(items);

      const result = await service.findAll();
      expect(result).toEqual(items);
    });

    it('should throw NotFoundException if no items found', async () => {
      (repository.findAll as jest.Mock).mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return an item by id', async () => {
      const item = { id: 1 };
      (repository.findOne as jest.Mock).mockResolvedValue(item);

      const result = await service.findOne(1);
      expect(result).toEqual(item);
    });

    it('should throw NotFoundException if item not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 2,
        observacoes: 'updated',
      };
      const item = { id: 1, ...updateItensDoPedidoDto };

      (repository.findOne as jest.Mock).mockResolvedValue(item);
      (pedidoService.findOne as jest.Mock).mockResolvedValue({});
      (produtoService.findOne as jest.Mock).mockResolvedValue({});
      (repository.update as jest.Mock).mockResolvedValue(item);

      const result = await service.update(1, updateItensDoPedidoDto);
      expect(result).toEqual(item);
    });

    it('should throw NotFoundException if item to update not found', async () => {
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

    it('should throw NotFoundException if pedido not found when updating', async () => {
      const updateItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 2,
        observacoes: 'updated',
      };
      const item = { id: 1, ...updateItensDoPedidoDto };

      (repository.findOne as jest.Mock).mockResolvedValue(item);
      (pedidoService.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('Pedido não encontrada'),
      );

      await expect(service.update(1, updateItensDoPedidoDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(pedidoService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if produto not found when updating', async () => {
      const updateItensDoPedidoDto = {
        id_pedido: 1,
        id_produto: 1,
        quantidade: 2,
        observacoes: 'updated',
      };
      const item = { id: 1, ...updateItensDoPedidoDto };

      (repository.findOne as jest.Mock).mockResolvedValue(item);
      (pedidoService.findOne as jest.Mock).mockResolvedValue({});
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
    it('should delete an item', async () => {
      const item = { id: 1 };

      (repository.findOne as jest.Mock).mockResolvedValue(item);
      (repository.delete as jest.Mock).mockResolvedValue(item);

      const result = await service.delete(1);
      expect(result).toEqual(item);
    });

    it('should throw NotFoundException if item to delete not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
