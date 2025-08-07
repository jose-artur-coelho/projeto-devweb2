import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from '../../../models/dto/user/create-user.dto';
import { User } from '../../../models/user';
import { UsersRepository } from './users.repository';
import prisma from '../../prisma';
import { UpdateUserDTO } from '../../../models/dto/user/update-user.dto';

export class PrismaUsersRepository implements UsersRepository {
  private readonly prisma: PrismaClient = prisma;

  async create(dto: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: dto,
    });
    return user;
  }

  async updateById(id: string, dto: UpdateUserDTO): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
