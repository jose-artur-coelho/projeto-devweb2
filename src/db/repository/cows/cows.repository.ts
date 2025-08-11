import { Cow } from '../../../models/cow';
import { CreateCowDTO } from '../../../models/dto/cow/create-cow.dto';
import { UpdateCowDTO } from '../../../models/dto/cow/update-cow.dto';

export interface CowsRepository {
  create(data: CreateCowDTO & { userId: string }): Promise<Cow>;
  findById(id: string): Promise<Cow | null>;
  findAll(): Promise<Cow[]>;
  findByUserId(userId: string): Promise<Cow[]>;
  updateById(id: string, data: UpdateCowDTO): Promise<Cow>;
  deleteById(id: string): Promise<void>;
}
