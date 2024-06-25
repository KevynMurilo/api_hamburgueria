import { Test, TestingModule } from '@nestjs/testing';
import { MesaController } from './mesa.controller';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { StatusMesa } from '@prisma/client';

describe('MesaController', () => {
  let controller: MesaController;
  let service: MesaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MesaController],
      providers: [
        {
          provide: MesaService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MesaController>(MesaController);
    service = module.get<MesaService>(MesaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new mesa', async () => {
      const createMesaDto: CreateMesaDto = {
        numero: 1,
        status: 'disponivel',
      };

      const mockCreateMesa = {
        id: 1,
        ...createMesaDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockCreateMesa);

      const result = await controller.create(createMesaDto);

      expect(result).toEqual(mockCreateMesa);
      expect(service.create).toHaveBeenCalledWith(createMesaDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of mesas', async () => {
      const mesas = [
        {
          id: 1,
          numero: 1,
          status: StatusMesa.disponivel,
        },
        {
          id: 2,
          numero: 2,
          status: StatusMesa.ocupado,
        },
      ];

      (service.findAll as jest.Mock).mockResolvedValue(mesas);

      const result = await controller.findAll();

      expect(result).toEqual(mesas);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
