import { Test, TestingModule } from '@nestjs/testing';
import { ItensPedidoHasItensAdicionaisService } from './itens-pedido-has-itens-adicionais.service';
import { ItensPedidoHasItensAdicionaisRepository } from './itens-pedido-has-itens-adicionais.repository';
import { ItensDoPedidoService } from '../itens-do-pedido/itens-do-pedido.service';
import { ItensAdicionaisService } from '../itens-adicionais/itens-adicionais.service';
import { ItensPedidoHasItensAdicionaisDto } from './dto/itens-pedido-has-itens-adicionais.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ItensPedidoHasItensAdicionaisService', () => {
  let service: ItensPedidoHasItensAdicionaisService;
  let repository: ItensPedidoHasItensAdicionaisRepository;
  let itensDoPedidoService: ItensDoPedidoService;
  let itensAdicionaisService: ItensAdicionaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItensPedidoHasItensAdicionaisService,
        {
          provide: ItensPedidoHasItensAdicionaisRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ItensDoPedidoService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: ItensAdicionaisService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ItensPedidoHasItensAdicionaisService>(
      ItensPedidoHasItensAdicionaisService,
    );
    repository = module.get<ItensPedidoHasItensAdicionaisRepository>(
      ItensPedidoHasItensAdicionaisRepository,
    );
    itensDoPedidoService =
      module.get<ItensDoPedidoService>(ItensDoPedidoService);
    itensAdicionaisService = module.get<ItensAdicionaisService>(
      ItensAdicionaisService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a link between items in order and additional items', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockResolvedValue(dto);
      jest.spyOn(itensDoPedidoService, 'findOne').mockResolvedValue(null);
      jest.spyOn(itensAdicionaisService, 'findOne').mockResolvedValue(null);

      const result = await service.create(dto);
      expect(result).toEqual(dto);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(itensDoPedidoService.findOne).toHaveBeenCalledWith(1);
      expect(itensAdicionaisService.findOne).toHaveBeenCalledWith(1);
    });

    it('should handle conflict exception', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(dto);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should find a link between items in order and additional items', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(dto);

      const result = await service.findOne(dto);
      expect(result).toEqual(dto);
      expect(repository.findOne).toHaveBeenCalledWith(dto);
    });

    it('should handle not found exception', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a link between items in order and additional items', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };
      jest.spyOn(repository, 'delete').mockResolvedValue(dto);
      jest.spyOn(itensDoPedidoService, 'findOne').mockResolvedValue(null);
      jest.spyOn(itensAdicionaisService, 'findOne').mockResolvedValue(null);

      const result = await service.delete(dto);
      expect(result).toEqual(dto);
      expect(repository.delete).toHaveBeenCalledWith(dto);
      expect(itensDoPedidoService.findOne).toHaveBeenCalledWith(1);
      expect(itensAdicionaisService.findOne).toHaveBeenCalledWith(1);
    });

    it('should handle not found exception', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };
      jest
        .spyOn(itensDoPedidoService, 'findOne')
        .mockRejectedValue(new NotFoundException());
      jest
        .spyOn(itensAdicionaisService, 'findOne')
        .mockRejectedValue(new NotFoundException());

      await expect(service.delete(dto)).rejects.toThrow(NotFoundException);
    });
  });
});
