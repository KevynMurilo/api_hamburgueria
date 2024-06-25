import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token when credentials are valid', async () => {
      const mockToken = 'mocked.jwt.token';
      (authService.signIn as jest.Mock).mockResolvedValue({ token: mockToken });

      const result = await controller.login('joao@example.com', 'senha123');
      expect(result.token).toEqual(mockToken);
      expect(authService.signIn).toHaveBeenCalledWith(
        'joao@example.com',
        'senha123',
      );
    });
  });
});
