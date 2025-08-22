import { AuthService } from '../../src/services/auth.service';
import { UsersRepository } from '../../src/db/repository/users/users.repository';
import { LoginDTO } from '../../src/models/dto/auth/login.dto';
import { User } from '../../src/models/user';
import * as bcrypt from 'bcrypt';
import * as auth from '../../src/lib/auth';

jest.mock('bcrypt');
jest.mock('../../src/lib/auth');

describe('AuthService', () => {
  let authService: AuthService;
  let mockUsersRepository: jest.Mocked<UsersRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsersRepository = {
      create: jest.fn(),
      updateById: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      deleteById: jest.fn(),
    };
    authService = new AuthService(mockUsersRepository);
  });

  describe('fazer login', () => {
    it('deve fazer login com sucesso com credenciais válidas', async () => {
      const loginDTO: LoginDTO = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user: User = {
        id: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password',
        role: 'USER',
      };

      const expectedToken = 'jwt_token_123';

      mockUsersRepository.findByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (auth.generateToken as jest.Mock).mockReturnValue(expectedToken);

      const result = await authService.login(loginDTO);

      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
        loginDTO.email
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDTO.password,
        user.password
      );
      expect(auth.generateToken).toHaveBeenCalledWith(user.id, user.role);
      expect(result).toBe(expectedToken);
    });

    it('deve lançar erro se usuário não for encontrado', async () => {
      const loginDTO: LoginDTO = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      mockUsersRepository.findByEmail.mockResolvedValue(null);

      await expect(authService.login(loginDTO)).rejects.toThrow(
        'Usuário não encontrado.'
      );

      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
        loginDTO.email
      );
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(auth.generateToken).not.toHaveBeenCalled();
    });

    it('deve lançar erro se senha for inválida', async () => {
      const loginDTO: LoginDTO = {
        email: 'test@example.com',
        password: 'wrong_password',
      };

      const user: User = {
        id: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed_password',
        role: 'USER',
      };

      mockUsersRepository.findByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login(loginDTO)).rejects.toThrow(
        'Senha inválida.'
      );

      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
        loginDTO.email
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDTO.password,
        user.password
      );
      expect(auth.generateToken).not.toHaveBeenCalled();
    });

    it('deve fazer login de usuário admin com sucesso', async () => {
      const loginDTO: LoginDTO = {
        email: 'admin@example.com',
        password: 'admin_password',
      };

      const adminUser: User = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'hashed_admin_password',
        role: 'ADMIN',
      };

      const expectedToken = 'admin_jwt_token_123';

      mockUsersRepository.findByEmail.mockResolvedValue(adminUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (auth.generateToken as jest.Mock).mockReturnValue(expectedToken);

      const result = await authService.login(loginDTO);

      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
        loginDTO.email
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDTO.password,
        adminUser.password
      );
      expect(auth.generateToken).toHaveBeenCalledWith(
        adminUser.id,
        adminUser.role
      );
      expect(result).toBe(expectedToken);
    });
  });
});
