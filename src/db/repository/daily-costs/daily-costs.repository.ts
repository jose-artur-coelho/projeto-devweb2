import { DailyCosts } from '../../../models/daily-costs';
import { CreateDailyCostsDTO } from '../../../models/dto/daily-costs/create-daily-costs.dto';
import { UpdateDailyCostsDTO } from '../../../models/dto/daily-costs/update-daily-costs.dto';

export interface DailyCostsRepository {
  create(data: CreateDailyCostsDTO & { userId: string }): Promise<DailyCosts>;
  findById(id: string): Promise<DailyCosts | null>;
  findAll(): Promise<DailyCosts[]>;
  findByUserId(userId: string): Promise<DailyCosts[]>;
  findByDateAndUserId(date: Date, userId: string): Promise<DailyCosts | null>;
  updateById(id: string, data: UpdateDailyCostsDTO): Promise<DailyCosts>;
  deleteById(id: string): Promise<void>;
}
