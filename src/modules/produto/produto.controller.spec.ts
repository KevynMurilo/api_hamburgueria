import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

describe('ProdutoController', () => {
  let controller: ProdutoController;
  let service: ProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [
        {
          provide: ProdutoService,
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

    controller = module.get<ProdutoController>(ProdutoController);
    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new produto', async () => {
      const createProdutoDto: CreateProdutoDto = {
        nome: 'Produto teste',
        descricao: 'Descricao teste',
        preco: 7.2,
      };
      const mockProduto = { id: 1, ...createProdutoDto };

      jest.spyOn(service, 'create').mockResolvedValue(mockProduto);

      const result = await controller.create(createProdutoDto);
      expect(result).toEqual(mockProduto);
      expect(service.create).toHaveBeenCalledWith(createProdutoDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of produtos', async () => {
      const mockProdutos = [
        {
          id: 1,
          nome: 'Produto teste',
          descricao: 'Descricao teste',
          preco: 7.2,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockProdutos);

      const result = await controller.findAll();
      expect(result).toEqual(mockProdutos);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a produto if found', async () => {
      const mockProduto = {
        id: 1,
        nome: 'Produto teste',
        descricao: 'Descricao teste',
        preco: 7.2,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockProduto);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockProduto);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a produto successfully', async () => {
      const updateProdutoDto: UpdateProdutoDto = {
        nome: 'Produto atualizado',
        descricao: 'Descricao atualizada',
        preco: 8.5,
      };
      const mockProduto = { id: 1, ...updateProdutoDto };

      jest.spyOn(service, 'update').mockResolvedValue({
        message: `Produto ${mockProduto.nome} atualizado com sucesso`,
      });

      const result = await controller.update('1', updateProdutoDto);
      expect(result).toEqual({
        message: `Produto ${mockProduto.nome} atualizado com sucesso`,
      });
      expect(service.update).toHaveBeenCalledWith(1, updateProdutoDto);
    });
  });

  describe('remove', () => {
    it('should delete a produto successfully', async () => {
      const mockProduto = {
        id: 1,
        nome: 'Produto deletado',
        descricao: 'Descricao deletada',
        preco: 7.2,
      };

      jest.spyOn(service, 'delete').mockResolvedValue({
        message: `Produto ${mockProduto.nome} deletado com sucesso`,
      });

      const result = await controller.remove('1');
      expect(result).toEqual({
        message: `Produto ${mockProduto.nome} deletado com sucesso`,
      });
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
