import { compare } from 'bcrypt';
import { UsersRepository } from '../db/repository/users/users.repository';
import { LoginDTO } from '../models/dto/auth/login.dto';
import { generateToken } from '../lib/auth';

export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async login(dto: LoginDTO) {
    const user = await this.usersRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new Error('Senha inválida.');
    }

    const token = generateToken(user.id, user.role);

    return token;
  }
}
