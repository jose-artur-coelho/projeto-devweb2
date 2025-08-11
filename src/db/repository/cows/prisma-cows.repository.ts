import prisma from '../../prisma';
import { Cow } from '../../../models/cow';
import { CreateCowDTO } from '../../../models/dto/cow/create-cow.dto';
import { UpdateCowDTO } from '../../../models/dto/cow/update-cow.dto';
import { CowsRepository } from './cows.repository';

export class PrismaCowsRepository implements CowsRepository {
  async create(data: CreateCowDTO & { userId: string }): Promise<Cow> {
    const cow = await prisma.cow.create({
      data: {
        name: data.name,
        race: data.race,
        birthDate: new Date(data.birthDate),
        userId: data.userId,
      },
    });
    return cow;
  }

  async findById(id: string): Promise<Cow | null> {
    const cow = await prisma.cow.findUnique({
      where: { id },
    });
    return cow;
  }

  async findAll(): Promise<Cow[]> {
    const cows = await prisma.cow.findMany();
    return cows;
  }

  async findByUserId(userId: string): Promise<Cow[]> {
    const cows = await prisma.cow.findMany({
      where: { userId },
    });
    return cows;
  }

  async updateById(id: string, data: UpdateCowDTO): Promise<Cow> {
    const updateData: any = { ...data };
    if (data.birthDate) {
      updateData.birthDate = new Date(data.birthDate);
    }

    const cow = await prisma.cow.update({
      where: { id },
      data: updateData,
    });
    return cow;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.cow.delete({
      where: { id },
    });
  }
}
