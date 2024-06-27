import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GarcomService } from '../garcom/garcom.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let garcomService: GarcomService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: GarcomService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    garcomService = module.get<GarcomService>(GarcomService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return a token when credentials are valid', async () => {
      const mockGarcom = {
        id: 1,
        nome: 'João',
        email: 'joao@example.com',
        senha: await bcrypt.hash('senha123', 10),
      };

      const mockToken = 'mocked.jwt.token';
      garcomService.findOneByEmail = jest.fn().mockResolvedValue(mockGarcom);
      jwtService.sign = jest.fn().mockReturnValue(mockToken);

      const result = await service.signIn('joao@example.com', 'senha123');
      expect(result.token).toEqual(mockToken);
      expect(garcomService.findOneByEmail).toHaveBeenCalledWith(
        'joao@example.com',
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: mockGarcom.id,
        nome: mockGarcom.nome,
        email: mockGarcom.email,
      });
    });

    it('should throw UnauthorizedException when email is not found', async () => {
      garcomService.findOneByEmail = jest.fn().mockResolvedValue(null);
      await expect(
        service.signIn('inexistente@example.com', 'senha123'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password does not match', async () => {
      const mockGarcom = {
        id: 1,
        nome: 'João',
        email: 'joao@example.com',
        senha: await bcrypt.hash('senha123', 10),
      };

      garcomService.findOneByEmail = jest.fn().mockResolvedValue(mockGarcom);
      await expect(
        service.signIn('joao@example.com', 'senha_errada'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
