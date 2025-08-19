import { GoatUpdate } from '../../../models/goat-update';
import { CreateGoatUpdateDTO } from '../../../models/dto/goat-update/create-goat-update.dto';
import { UpdateGoatUpdateDTO } from '../../../models/dto/goat-update/update-goat-update.dto';

export interface GoatUpdatesRepository {
  create(data: CreateGoatUpdateDTO & { userId: string }): Promise<GoatUpdate>;
  findById(id: string): Promise<GoatUpdate | null>;
  findAll(): Promise<GoatUpdate[]>;
  findByUserId(userId: string): Promise<GoatUpdate[]>;
  findByDateAndGoatId(date: Date, goatId: string): Promise<GoatUpdate | null>;
  updateById(id: string, data: UpdateGoatUpdateDTO): Promise<GoatUpdate>;
  deleteById(id: string): Promise<void>;
}
