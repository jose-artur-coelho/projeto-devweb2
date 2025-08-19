import prisma from '../../prisma';
import { DailyCosts } from '../../../models/daily-costs';
import { CreateDailyCostsDTO } from '../../../models/dto/daily-costs/create-daily-costs.dto';
import { UpdateDailyCostsDTO } from '../../../models/dto/daily-costs/update-daily-costs.dto';
import { DailyCostsRepository } from './daily-costs.repository';

export class PrismaDailyCostsRepository implements DailyCostsRepository {
  async create(
    data: CreateDailyCostsDTO & { userId: string }
  ): Promise<DailyCosts> {
    const costs = await prisma.dailyCosts.create({
      data: {
        date: new Date(data.date),
        laborCosts: data.laborCosts,
        feedCosts: data.feedCosts,
        userId: data.userId,
      },
    });
    return costs;
  }

  async findById(id: string): Promise<DailyCosts | null> {
    const costs = await prisma.dailyCosts.findUnique({
      where: { id },
    });
    return costs;
  }

  async findAll(): Promise<DailyCosts[]> {
    const costs = await prisma.dailyCosts.findMany({
      orderBy: { date: 'desc' },
    });
    return costs;
  }

  async findByUserId(userId: string): Promise<DailyCosts[]> {
    const costs = await prisma.dailyCosts.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    return costs;
  }

  async findByDateAndUserId(
    date: Date,
    userId: string
  ): Promise<DailyCosts | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const costs = await prisma.dailyCosts.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    return costs;
  }

  async updateById(id: string, data: UpdateDailyCostsDTO): Promise<DailyCosts> {
    const costs = await prisma.dailyCosts.update({
      where: { id },
      data,
    });
    return costs;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.dailyCosts.delete({
      where: { id },
    });
  }
}
