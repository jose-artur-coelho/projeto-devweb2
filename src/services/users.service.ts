import { UsersRepository } from '../db/repository/users/users.repository';
import { CreateUserDTO } from '../types/dto/create-user.dto';
import { UpdateUserDTO } from '../types/dto/update-user.dto';
import { hash, compare } from 'bcrypt';

export class UsersService {
  private readonly usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async createUser(dto: CreateUserDTO) {
    const encryptedPassword = await hash(dto.password, 6);

    const createdUser = await this.usersRepository.create({
      ...dto,
      password: encryptedPassword,
    });

    return createdUser;
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    const encryptedPassword = dto.password
      ? await hash(dto.password, 6)
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
