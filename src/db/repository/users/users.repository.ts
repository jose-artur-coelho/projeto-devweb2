import { CreateUserDTO } from '../../../types/dto/create-user.dto';
import { UpdateUserDTO } from '../../../types/dto/update-user.dto';
import { User } from '../../../types/User';

export interface UsersRepository {
  create(dto: CreateUserDTO): Promise<User>;
  update(id: string, dto: UpdateUserDTO): Promise<User>;
  get(id: string): Promise<User | null>;
  delete(id: string): void;
}
