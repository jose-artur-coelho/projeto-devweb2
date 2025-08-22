import { UsersRepository } from '../db/repository/users/users.repository';
import { CreateUserDTO } from '../models/dto/user/create-user.dto';
import { UpdateUserDTO } from '../models/dto/user/update-user.dto';
import { hash } from 'bcrypt';

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async create(dto: CreateUserDTO) {
    const encryptedPassword = await hash(dto.password, 6);

    const createdUser = await this.usersRepository.create({
      ...dto,
      password: encryptedPassword,
    });

    return createdUser;
  }

  async update(id: string, dto: UpdateUserDTO) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const encryptedPassword = dto.password
      ? await hash(dto.password, 6)
      : undefined;

    const updatedUser = await this.usersRepository.updateById(id, {
      ...dto,
      password: encryptedPassword,
    });

    return updatedUser;
  }

  async find(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    return user;
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async delete(id: string) {
    await this.usersRepository.deleteById(id);
  }
}
