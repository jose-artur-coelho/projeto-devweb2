import { DailyCostsRepository } from '../db/repository/daily-costs/daily-costs.repository';
import { CreateDailyCostsDTO } from '../models/dto/daily-costs/create-daily-costs.dto';
import { UpdateDailyCostsDTO } from '../models/dto/daily-costs/update-daily-costs.dto';

export class DailyCostsService {
  constructor(private readonly dailyCostsRepository: DailyCostsRepository) {
    this.dailyCostsRepository = dailyCostsRepository;
  }

  async create(dto: CreateDailyCostsDTO, userId: string) {
    const existingCosts = await this.dailyCostsRepository.findByDateAndUserId(
      new Date(dto.date),
      userId
    );

    if (existingCosts) {
      throw new Error('Já existem custos registrados para esta data.');
    }

    const createdCosts = await this.dailyCostsRepository.create({
      ...dto,
      userId,
    });

    return createdCosts;
  }

  async update(id: string, dto: UpdateDailyCostsDTO, userId: string) {
    const costs = await this.dailyCostsRepository.findById(id);
    if (!costs) {
      throw new Error('Custos diários não encontrados.');
    }

    if (costs.userId !== userId) {
      throw new Error('Você não tem permissão para editar estes custos.');
    }

    const updatedCosts = await this.dailyCostsRepository.updateById(id, dto);
    return updatedCosts;
  }

  async find(id: string) {
    const costs = await this.dailyCostsRepository.findById(id);
    if (!costs) {
      throw new Error('Custos diários não encontrados.');
    }
    return costs;
  }

  async findAll() {
    const costs = await this.dailyCostsRepository.findAll();
    return costs;
  }

  async findByUserId(userId: string) {
    const costs = await this.dailyCostsRepository.findByUserId(userId);
    return costs;
  }

  async delete(id: string, userId: string) {
    const costs = await this.dailyCostsRepository.findById(id);
    if (!costs) {
      throw new Error('Custos diários não encontrados.');
    }

    if (costs.userId !== userId) {
      throw new Error('Você não tem permissão para deletar estes custos.');
    }

    await this.dailyCostsRepository.deleteById(id);
  }
}
