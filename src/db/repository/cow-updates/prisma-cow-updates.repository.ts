import prisma from '../../prisma';
import { CowUpdate } from '../../../models/cow-update';
import { CreateCowUpdateDTO } from '../../../models/dto/cow-update/create-cow-update.dto';
import { UpdateCowUpdateDTO } from '../../../models/dto/cow-update/update-cow-update.dto';
import { CowUpdatesRepository } from './cow-updates.repository';

export class PrismaCowUpdatesRepository implements CowUpdatesRepository {
  async create(
    data: CreateCowUpdateDTO & { userId: string }
  ): Promise<CowUpdate> {
    const update = await prisma.cowUpdate.create({
      data: {
        date: new Date(data.date),
        sick: data.sick,
        milkQuantity: data.milkQuantity,
        cowId: data.cowId,
        userId: data.userId,
      },
    });
    return update;
  }

  async findById(id: string): Promise<CowUpdate | null> {
    const update = await prisma.cowUpdate.findUnique({
      where: { id },
    });
    return update;
  }

  async findAll(): Promise<CowUpdate[]> {
    const updates = await prisma.cowUpdate.findMany({
      orderBy: { date: 'desc' },
    });
    return updates;
  }

  async findByUserId(userId: string): Promise<CowUpdate[]> {
    const updates = await prisma.cowUpdate.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    return updates;
  }

  async findByDateAndCowId(
    date: Date,
    cowId: string
  ): Promise<CowUpdate | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const update = await prisma.cowUpdate.findFirst({
      where: {
        cowId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    return update;
  }

  async updateById(id: string, data: UpdateCowUpdateDTO): Promise<CowUpdate> {
    const update = await prisma.cowUpdate.update({
      where: { id },
      data,
    });
    return update;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.cowUpdate.delete({
      where: { id },
    });
  }
}
