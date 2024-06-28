import { Test, TestingModule } from '@nestjs/testing';
import { ItensAdicionaisController } from './itens-adicionais.controller';
import { ItensAdicionaisService } from './itens-adicionais.service';
import { CreateItensAdicionaiDto } from './dto/create-itens-adicionai.dto';
import { UpdateItensAdicionaiDto } from './dto/update-itens-adicionai.dto';

describe('ItensAdicionaisController', () => {
  let controller: ItensAdicionaisController;
  let service: ItensAdicionaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItensAdicionaisController],
      providers: [
        {
          provide: ItensAdicionaisService,
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

    controller = module.get<ItensAdicionaisController>(
      ItensAdicionaisController,
    );
    service = module.get<ItensAdicionaisService>(ItensAdicionaisService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new item adicional', async () => {
      const createDto: CreateItensAdicionaiDto = {
        nome: 'Item teste',
        descricao: 'Descrição do item teste',
        preco: 10.5,
      };

      await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of items adicionais', async () => {
      const items = [
        {
          id: 1,
          nome: 'Item 1',
          descricao: 'Descrição do Item 1',
          preco: 15.0,
        },
        {
          id: 2,
          nome: 'Item 2',
          descricao: 'Descrição do Item 2',
          preco: 15.0,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(items);

      expect(await controller.findAll()).toBe(items);
    });
  });

  describe('findOne', () => {
    it('should return the item adicional with the given id', async () => {
      const item = {
        id: 1,
        nome: 'Item 1',
        descricao: 'Descrição do Item 1',
        preco: 15.0,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(item);

      expect(await controller.findOne(1)).toBe(item);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update the item adicional with the given id', async () => {
      const id = 1;
      const updateDto: UpdateItensAdicionaiDto = {
        nome: 'Item 1 atualizado',
        descricao: 'Descrição atualizada do Item 1',
        preco: 20.0,
      };

      jest.spyOn(service, 'update').mockResolvedValue({
        message: `Item ${updateDto.nome} atualizado com sucesso`,
      });

      expect(await controller.update(id, updateDto)).toEqual({
        message: `Item ${updateDto.nome} atualizado com sucesso`,
      });
      expect(service.update).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('delete', () => {
    it('should delete the item adicional with the given id', async () => {
      const id = 1;

      jest
        .spyOn(service, 'delete')
        .mockResolvedValue({ message: 'Item deletado com sucesso' });

      expect(await controller.delete(id)).toEqual({
        message: 'Item deletado com sucesso',
      });
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
