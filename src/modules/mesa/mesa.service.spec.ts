import { Test, TestingModule } from '@nestjs/testing';
import { MesaService } from './mesa.service';
import { MesaRepository } from './mesa.repository';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { StatusMesa } from '@prisma/client';

describe('MesaService', () => {
  let service: MesaService;
  let repository: MesaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MesaService,
        {
          provide: MesaRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MesaService>(MesaService);
    repository = module.get<MesaRepository>(MesaRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new mesa', async () => {
      const createMesaDto: CreateMesaDto = {
        numero: 1,
        status: 'disponivel',
      };

      const mockCreatedMesa = {
        id: 1,
        ...createMesaDto,
      };

      (repository.create as jest.Mock).mockResolvedValue(mockCreatedMesa);

      const result = await service.create(createMesaDto);

      expect(result).toEqual(mockCreatedMesa);
      expect(repository.create).toHaveBeenCalledWith(createMesaDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of garcons if they exist', async () => {
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

      (repository.findAll as jest.Mock).mockResolvedValue(mesas);

      const result = await service.findAll();

      expect(result).toEqual(mesas);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });
});
