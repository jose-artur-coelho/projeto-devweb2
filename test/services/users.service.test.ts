import { UsersService } from '../../src/services/users.service';
import { UsersRepository } from '../../src/db/repository/users/users.repository';
import { CreateUserDTO } from '../../src/models/dto/user/create-user.dto';
import { UpdateUserDTO } from '../../src/models/dto/user/update-user.dto';
import { User } from '../../src/models/user';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UsersService', () => {
  let usersService: UsersService;
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
    usersService = new UsersService(mockUsersRepository);
  });

  describe('criar usuário', () => {
    it('deve criar um usuário com senha criptografada', async () => {
      const createUserDTO: CreateUserDTO = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const encryptedPassword = 'encrypted_password';
      const expectedUser: User = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: encryptedPassword,
        role: 'USER',
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue(encryptedPassword);
      mockUsersRepository.create.mockResolvedValue(expectedUser);

      const result = await usersService.create(createUserDTO);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 6);
      expect(mockUsersRepository.create).toHaveBeenCalledWith({
        ...createUserDTO,
        password: encryptedPassword,
      });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('atualizar usuário', () => {
    it('deve atualizar um usuário com senha criptografada', async () => {
      const userId = '1';
      const updateUserDTO: UpdateUserDTO = {
        name: 'Updated User',
        password: 'newpassword123',
      };

      const existingUser: User = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        password: 'old_password',
        role: 'USER',
      };

      const encryptedPassword = 'encrypted_new_password';
      const updatedUser: User = {
        ...existingUser,
        name: 'Updated User',
        password: encryptedPassword,
      };

      mockUsersRepository.findById.mockResolvedValue(existingUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue(encryptedPassword);
      mockUsersRepository.updateById.mockResolvedValue(updatedUser);

      const result = await usersService.update(userId, updateUserDTO);

      expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId);
      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 6);
      expect(mockUsersRepository.updateById).toHaveBeenCalledWith(userId, {
        ...updateUserDTO,
        password: encryptedPassword,
      });
      expect(result).toEqual(updatedUser);
    });

    it('deve atualizar um usuário sem senha', async () => {
      const userId = '1';
      const updateUserDTO: UpdateUserDTO = {
        name: 'Updated User',
      };

      const existingUser: User = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        password: 'old_password',
        role: 'USER',
      };

      const updatedUser: User = {
        ...existingUser,
        name: 'Updated User',
      };

      mockUsersRepository.findById.mockResolvedValue(existingUser);
      mockUsersRepository.updateById.mockResolvedValue(updatedUser);

      const result = await usersService.update(userId, updateUserDTO);

      expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId);
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(mockUsersRepository.updateById).toHaveBeenCalledWith(userId, {
        ...updateUserDTO,
        password: undefined,
      });
      expect(result).toEqual(updatedUser);
    });

    it('deve lançar erro se usuário não for encontrado', async () => {
      const userId = '1';
      const updateUserDTO: UpdateUserDTO = {
        name: 'Updated User',
      };

      mockUsersRepository.findById.mockResolvedValue(null);

      await expect(usersService.update(userId, updateUserDTO)).rejects.toThrow(
        'Usuário não encontrado.'
      );
    });
  });

  describe('buscar usuário', () => {
    it('deve retornar um usuário por id', async () => {
      const userId = '1';
      const expectedUser: User = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: 'USER',
      };

      mockUsersRepository.findById.mockResolvedValue(expectedUser);

      const result = await usersService.find(userId);

      expect(mockUsersRepository.findById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedUser);
    });

    it('deve lançar erro se usuário não for encontrado', async () => {
      const userId = '1';

      mockUsersRepository.findById.mockResolvedValue(null);

      await expect(usersService.find(userId)).rejects.toThrow(
        'Usuário não encontrado.'
      );
    });
  });

  describe('buscar todos os usuários', () => {
    it('deve retornar todos os usuários', async () => {
      const expectedUsers: User[] = [
        {
          id: '1',
          name: 'User 1',
          email: 'user1@example.com',
          password: 'password1',
          role: 'USER',
        },
        {
          id: '2',
          name: 'User 2',
          email: 'user2@example.com',
          password: 'password2',
          role: 'ADMIN',
        },
      ];

      mockUsersRepository.findAll.mockResolvedValue(expectedUsers);

      const result = await usersService.findAll();

      expect(mockUsersRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('deletar usuário', () => {
    it('deve deletar um usuário', async () => {
      const userId = '1';

      mockUsersRepository.deleteById.mockResolvedValue();

      await usersService.delete(userId);

      expect(mockUsersRepository.deleteById).toHaveBeenCalledWith(userId);
    });
  });
});
