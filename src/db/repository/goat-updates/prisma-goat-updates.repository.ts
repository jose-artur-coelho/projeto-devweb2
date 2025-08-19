import prisma from '../../prisma';
import { GoatUpdate } from '../../../models/goat-update';
import { CreateGoatUpdateDTO } from '../../../models/dto/goat-update/create-goat-update.dto';
import { UpdateGoatUpdateDTO } from '../../../models/dto/goat-update/update-goat-update.dto';
import { GoatUpdatesRepository } from './goat-updates.repository';

export class PrismaGoatUpdatesRepository implements GoatUpdatesRepository {
  async create(
    data: CreateGoatUpdateDTO & { userId: string }
  ): Promise<GoatUpdate> {
    const update = await prisma.goatUpdate.create({
      data: {
        date: new Date(data.date),
        sick: data.sick,
        milkQuantity: data.milkQuantity,
        goatId: data.goatId,
        userId: data.userId,
      },
    });
    return update;
  }

  async findById(id: string): Promise<GoatUpdate | null> {
    const update = await prisma.goatUpdate.findUnique({
      where: { id },
    });
    return update;
  }

  async findAll(): Promise<GoatUpdate[]> {
    const updates = await prisma.goatUpdate.findMany({
      orderBy: { date: 'desc' },
    });
    return updates;
  }

  async findByUserId(userId: string): Promise<GoatUpdate[]> {
    const updates = await prisma.goatUpdate.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    return updates;
  }

  async findByDateAndGoatId(
    date: Date,
    goatId: string
  ): Promise<GoatUpdate | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const update = await prisma.goatUpdate.findFirst({
      where: {
        goatId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    return update;
  }

  async updateById(id: string, data: UpdateGoatUpdateDTO): Promise<GoatUpdate> {
    const update = await prisma.goatUpdate.update({
      where: { id },
      data,
    });
    return update;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.goatUpdate.delete({
      where: { id },
    });
  }
}
