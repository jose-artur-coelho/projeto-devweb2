import { CreateUserDTO } from '../../../models/dto/user/create-user.dto';
import { UpdateUserDTO } from '../../../models/dto/user/update-user.dto';
import { User } from '../../../models/user';

export interface UsersRepository {
  create(dto: CreateUserDTO): Promise<User>;
  updateById(id: string, dto: UpdateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  deleteById(id: string): Promise<void>;
}
