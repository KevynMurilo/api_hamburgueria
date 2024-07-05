import { Test, TestingModule } from '@nestjs/testing';
import { ItensPedidoHasItensAdicionaisService } from './itens-pedido-has-itens-adicionais.service';
import { ItensPedidoHasItensAdicionaisRepository } from './itens-pedido-has-itens-adicionais.repository';
import { ItensDoPedidoService } from '../itens-do-pedido/itens-do-pedido.service';
import { ItensAdicionaisService } from '../itens-adicionais/itens-adicionais.service';
import { ItensPedidoHasItensAdicionaisDto } from './dto/itens-pedido-has-itens-adicionais.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('ItensPedidoHasItensAdicionaisService', () => {
  let service: ItensPedidoHasItensAdicionaisService;
  let repository: ItensPedidoHasItensAdicionaisRepository;
  let itensDoPedidoService: ItensDoPedidoService;
  let itensAdicionaisService: ItensAdicionaisService;
  let trx: Prisma.TransactionClient;

  beforeEach(async () => {
    trx = {} as Prisma.TransactionClient; // Mock TransactionClient

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

      // Mock behaviors
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockResolvedValue(dto);
      jest.spyOn(itensDoPedidoService, 'findOne').mockResolvedValue({} as any); // Mock a valid item
      jest
        .spyOn(itensAdicionaisService, 'findOne')
        .mockResolvedValue({} as any); // Mock a valid item

      // Call the create method
      const result = await service.create(trx, dto);

      // Assertions
      expect(result).toEqual(dto);
      expect(repository.create).toHaveBeenCalledWith(trx, dto);
      expect(itensAdicionaisService.findOne).toHaveBeenCalledWith(
        dto.id_item_adicional,
      );
    });

    it('should handle conflict exception', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(dto);

      await expect(service.create(trx, dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('delete', () => {
    it('deve deletar um vínculo entre itens do pedido e itens adicionais', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };

      // Comportamentos simulados
      jest.spyOn(repository, 'delete').mockResolvedValue(dto);
      jest.spyOn(itensDoPedidoService, 'findOne').mockResolvedValue({} as any);
      jest
        .spyOn(itensAdicionaisService, 'findOne')
        .mockResolvedValue({} as any);

      // Chamar o método delete
      const result = await service.delete(dto);

      // Verificações
      expect(result).toEqual(dto);
      expect(repository.delete).toHaveBeenCalledWith(dto);
      expect(itensDoPedidoService.findOne).toHaveBeenCalledWith(
        dto.id_item_do_pedido,
      );
      expect(itensAdicionaisService.findOne).toHaveBeenCalledWith(
        dto.id_item_adicional,
      );
    });

    it('deve lançar exceção de não encontrado', async () => {
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
