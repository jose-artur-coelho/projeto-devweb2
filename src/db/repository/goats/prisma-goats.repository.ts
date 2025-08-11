import prisma from '../../prisma';
import { Goat } from '../../../models/goat';
import { CreateGoatDTO } from '../../../models/dto/goat/create-goat.dto';
import { UpdateGoatDTO } from '../../../models/dto/goat/update-goat.dto';
import { GoatsRepository } from './goats.repository';

export class PrismaGoatsRepository implements GoatsRepository {
  async create(data: CreateGoatDTO & { userId: string }): Promise<Goat> {
    const goat = await prisma.goat.create({
      data: {
        name: data.name,
        race: data.race,
        birthDate: new Date(data.birthDate),
        userId: data.userId,
      },
    });
    return goat;
  }

  async findById(id: string): Promise<Goat | null> {
    const goat = await prisma.goat.findUnique({
      where: { id },
    });
    return goat;
  }

  async findAll(): Promise<Goat[]> {
    const goats = await prisma.goat.findMany();
    return goats;
  }

  async findByUserId(userId: string): Promise<Goat[]> {
    const goats = await prisma.goat.findMany({
      where: { userId },
    });
    return goats;
  }

  async updateById(id: string, data: UpdateGoatDTO): Promise<Goat> {
    const updateData: any = { ...data };
    if (data.birthDate) {
      updateData.birthDate = new Date(data.birthDate);
    }

    const goat = await prisma.goat.update({
      where: { id },
      data: updateData,
    });
    return goat;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.goat.delete({
      where: { id },
    });
  }
}
