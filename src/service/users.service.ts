import { UsersRepository } from '../db/repository/users/users.repository';
import { passwordManager } from '../lib/password-manager';
import { CreateUserDTO } from '../types/dto/create-user.dto';
import { UpdateUserDTO } from '../types/dto/update-user.dto';

export class UsersService {
  private readonly usersRepository: UsersRepository;
  private readonly passwordManager: passwordManager;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
    this.passwordManager = new passwordManager();
  }

  async createUser(dto: CreateUserDTO) {
    const encryptedPassword = await this.passwordManager.encrypt(dto.password);

    const createdUser = await this.usersRepository.create({
      ...dto,
      password: encryptedPassword,
    });

    return createdUser;
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    const encryptedPassword = dto.password
      ? await this.passwordManager.encrypt(dto.password)
      : undefined;

    const updatedUser = await this.usersRepository.update(id, {
      ...dto,
      password: encryptedPassword,
    });

    return updatedUser;
  }

  async getUser(id: string) {
    const user = await this.usersRepository.get(id);
    return user;
  }

  deleteUser(id: string) {
    this.usersRepository.delete(id);
  }
}
