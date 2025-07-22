import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from '../../../types/dto/create-user.dto';
import { User } from '../../../types/User';
import { UsersRepository } from './users.repository';
import prisma from '../../prisma';
import { UpdateUserDTO } from '../../../types/dto/update-user.dto';

export class PrismaUsersRepository implements UsersRepository {
  private readonly prisma: PrismaClient = prisma;

  async create(dto: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: dto,
    });
    return user;
  }

  async update(id: string, dto: UpdateUserDTO): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });
    return user;
  }

  async get(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
