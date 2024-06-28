import { Test, TestingModule } from '@nestjs/testing';
import { ItensAdicionaisService } from './itens-adicionais.service';
import { ItensAdicionaisRepository } from './itens-adicionais.repository';
import { CreateItensAdicionaiDto } from './dto/create-itens-adicionai.dto';
import { NotFoundException } from '@nestjs/common';

describe('ItensAdicionaisService', () => {
  let service: ItensAdicionaisService;
  let repository: ItensAdicionaisRepository;

  const mockItensAdicionaisRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItensAdicionaisService,
        {
          provide: ItensAdicionaisRepository,
          useValue: mockItensAdicionaisRepository,
        },
      ],
    }).compile();

    service = module.get<ItensAdicionaisService>(ItensAdicionaisService);
    repository = module.get<ItensAdicionaisRepository>(
      ItensAdicionaisRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new item', async () => {
      const createItensAdicionaiDto: CreateItensAdicionaiDto = {
        nome: 'item1',
        descricao: 'descricao do item',
        preco: 10,
      };

      const mockCreatedItem = {
        id: 1,
        ...createItensAdicionaiDto,
      };

      (repository.create as jest.Mock).mockResolvedValue(mockCreatedItem);

      const result = await service.create(createItensAdicionaiDto);

      expect(result).toEqual(mockCreatedItem);
      expect(repository.create).toHaveBeenCalledWith(createItensAdicionaiDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const items = [
        {
          id: 1,
          nome: 'item1',
          descricao: 'descricao do item',
          preco: 10,
        },
      ];

      (repository.findAll as jest.Mock).mockResolvedValue(items);

      const result = await service.findAll();

      expect(result).toEqual(items);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no items are found', async () => {
      (repository.findAll as jest.Mock).mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return an item if it exists', async () => {
      const mockItem = {
        id: 1,
        nome: 'item1',
        descricao: 'descricao do item',
        preco: 10,
      };

      (repository.findOne as jest.Mock).mockResolvedValue(mockItem);

      const result = await service.findOne(1);

      expect(result).toEqual(mockItem);
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if item does not exist', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if item does not exist', async () => {
      const id = 1;
      const updateItensAdicionaiDto = {
        nome: 'updatedItem',
        descricao: 'descricao atualizada do item',
        preco: 15,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.update(id, updateItensAdicionaiDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findOne).toHaveBeenCalledWith(id);
      expect(repository.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should throw NotFoundException if item does not exist', async () => {
      const id = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(service.delete(id)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith(id);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
