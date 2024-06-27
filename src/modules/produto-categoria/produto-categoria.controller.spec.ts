import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoCategoriaController } from './produto-categoria.controller';
import { ProdutoCategoriaService } from './produto-categoria.service';
import { CreateProdutoCategoriaDto } from './dto/create-produto-categoria.dto';
import { DeleteProdutoCategoriaDto } from './dto/delete-produto-categoria.dto';

describe('ProdutoCategoriaController', () => {
  let controller: ProdutoCategoriaController;
  let service: ProdutoCategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoCategoriaController],
      providers: [
        {
          provide: ProdutoCategoriaService,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProdutoCategoriaController>(
      ProdutoCategoriaController,
    );
    service = module.get<ProdutoCategoriaService>(ProdutoCategoriaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new ProdutoCategoria', async () => {
      const createDto: CreateProdutoCategoriaDto = {
        id_produto: 1,
        id_categoria: [2, 3],
      };

      const result = { count: 2 };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      const response = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(response).toEqual(result);
    });
  });

  describe('delete', () => {
    it('should delete an existing ProdutoCategoria', async () => {
      const id_produto = 1;
      const id_categoria = 2;
      const deleteDto: DeleteProdutoCategoriaDto = { id_produto, id_categoria };

      const result = { id_produto, id_categoria };
      jest.spyOn(service, 'delete').mockResolvedValue(result);

      const response = await controller.delete(id_produto, id_categoria);

      expect(service.delete).toHaveBeenCalledWith(deleteDto);
      expect(response).toEqual(result);
    });
  });
});
