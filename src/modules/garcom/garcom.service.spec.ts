import { Test, TestingModule } from '@nestjs/testing';
import { GarcomService } from './garcom.service';
import { GarcomRepository } from './garcom.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateGarcomDto } from './dto/create-garcom.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('GarcomService', () => {
  let service: GarcomService;
  let repository: GarcomRepository;
  let bcryptHashSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GarcomService,
        {
          provide: GarcomRepository,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GarcomService>(GarcomService);
    repository = module.get<GarcomRepository>(GarcomRepository);
    bcryptHashSpy = jest.spyOn(bcrypt, 'hash');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw ConflictException if email already exists', async () => {
      const createGarcomDto: CreateGarcomDto = {
        email: 'test@example.com',
        nome: 'Test',
        senha: 'password123',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        nome: 'Test',
        senha: 'password123',
      });

      await expect(service.create(createGarcomDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should create a new garcom if email does not exist', async () => {
      const createGarcomDto: CreateGarcomDto = {
        email: 'test@example.com',
        nome: 'Test',
        senha: 'password123',
      };
      const hashedPassword = 'hashedPassword123';
      const garcom = { id: 1, ...createGarcomDto, senha: hashedPassword };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockResolvedValue(garcom);
      bcryptHashSpy.mockResolvedValue(hashedPassword);

      const result = await service.create(createGarcomDto);

      expect(result).toEqual(garcom);
      expect(repository.findOne).toHaveBeenCalledWith(createGarcomDto.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(createGarcomDto.senha, 10);
      expect(repository.create).toHaveBeenCalledWith({
        ...createGarcomDto,
        senha: hashedPassword,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of garcons if they exist', async () => {
      const garcons = [
        {
          id: 1,
          nome: 'Garcom1',
          email: 'garcom1@example.com',
          senha: 'hashedPassword1',
        },
        {
          id: 2,
          nome: 'Garcom2',
          email: 'garcom2@example.com',
          senha: 'hashedPassword2',
        },
      ];

      jest.spyOn(repository, 'findAll').mockResolvedValue(garcons);

      const result = await service.findAll();

      expect(result).toEqual(garcons);
      expect(repository.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no garcons are found', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });
});
