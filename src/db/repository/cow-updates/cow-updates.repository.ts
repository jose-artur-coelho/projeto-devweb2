import { CowUpdate } from '../../../models/cow-update';
import { CreateCowUpdateDTO } from '../../../models/dto/cow-update/create-cow-update.dto';
import { UpdateCowUpdateDTO } from '../../../models/dto/cow-update/update-cow-update.dto';

export interface CowUpdatesRepository {
  create(data: CreateCowUpdateDTO & { userId: string }): Promise<CowUpdate>;
  findById(id: string): Promise<CowUpdate | null>;
  findAll(): Promise<CowUpdate[]>;
  findByUserId(userId: string): Promise<CowUpdate[]>;
  findByDateAndCowId(date: Date, cowId: string): Promise<CowUpdate | null>;
  updateById(id: string, data: UpdateCowUpdateDTO): Promise<CowUpdate>;
  deleteById(id: string): Promise<void>;
}
