import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoHasCategoriaController } from './produto-has-categoria.controller';
import { ProdutoHasCategoriaService } from './produto-has-categoria.service';
import { ProdutoCategoriaDto } from './dto/produto-categoria.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('ProdutoHasCategoriaController', () => {
  let controller: ProdutoHasCategoriaController;
  let service: ProdutoHasCategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoHasCategoriaController],
      providers: [
        {
          provide: ProdutoHasCategoriaService,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProdutoHasCategoriaController>(
      ProdutoHasCategoriaController,
    );
    service = module.get<ProdutoHasCategoriaService>(
      ProdutoHasCategoriaService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product-category link', async () => {
      const dto: ProdutoCategoriaDto = { id_produto: 1, id_categoria: 1 };
      jest.spyOn(service, 'create').mockResolvedValue(dto);

      const result = await controller.create(dto);
      expect(result).toEqual(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should handle conflict exception', async () => {
      const dto: ProdutoCategoriaDto = { id_produto: 1, id_categoria: 1 };
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new ConflictException(
            'Vinculo entre produto e categoria já registrado',
          ),
        );

      await expect(controller.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('delete', () => {
    it('should delete a product-category link', async () => {
      const dto: ProdutoCategoriaDto = { id_produto: 1, id_categoria: 1 };
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
