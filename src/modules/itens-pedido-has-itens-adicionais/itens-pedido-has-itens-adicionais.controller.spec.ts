import { Test, TestingModule } from '@nestjs/testing';
import { ItensPedidoHasItensAdicionaisController } from './itens-pedido-has-itens-adicionais.controller';
import { ItensPedidoHasItensAdicionaisService } from './itens-pedido-has-itens-adicionais.service';
import { ItensPedidoHasItensAdicionaisDto } from './dto/itens-pedido-has-itens-adicionais.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ItensPedidoHasItensAdicionaisController', () => {
  let controller: ItensPedidoHasItensAdicionaisController;
  let service: ItensPedidoHasItensAdicionaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItensPedidoHasItensAdicionaisController],
      providers: [
        {
          provide: ItensPedidoHasItensAdicionaisService,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ItensPedidoHasItensAdicionaisController>(
      ItensPedidoHasItensAdicionaisController,
    );
    service = module.get<ItensPedidoHasItensAdicionaisService>(
      ItensPedidoHasItensAdicionaisService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a link between item do pedido and item adicional', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };
      jest.spyOn(service, 'create').mockResolvedValue(dto);

      const result = await controller.create(dto);
      expect(result).toEqual(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should handle conflict exception', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new ConflictException(
            'Vinculo entre itens do pedido e itens adicionais já registrado',
          ),
        );

      await expect(controller.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('delete', () => {
    it('should delete a link between item do pedido and item adicional', async () => {
      const dto: ItensPedidoHasItensAdicionaisDto = {
        id_item_do_pedido: 1,
        id_item_adicional: 1,
      };
      jest.spyOn(service, 'delete').mockResolvedValue(dto);

      const result = await controller.delete(1, 1);
      expect(result).toEqual(dto);
      expect(service.delete).toHaveBeenCalledWith(dto);
    });

    it('should handle not found exception', async () => {
      jest
        .spyOn(service, 'delete')
        .mockRejectedValue(
          new NotFoundException(
            'Nenhum vinculo entre produto e categoria encontrado',
          ),
        );

      await expect(controller.delete(1, 1)).rejects.toThrow(NotFoundException);
    });
  });
});
