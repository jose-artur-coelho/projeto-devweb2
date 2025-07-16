import { User } from '../../../types/User';

export interface UserRepository {
  create(dto: CreateUserDTO): User;
  update(dto: CreateUserDTO): User;
  get(id: string): User;
  delete(id: string): void;
}
