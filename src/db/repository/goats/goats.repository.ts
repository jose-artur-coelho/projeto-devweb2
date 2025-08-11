import { Goat } from '../../../models/goat';
import { CreateGoatDTO } from '../../../models/dto/goat/create-goat.dto';
import { UpdateGoatDTO } from '../../../models/dto/goat/update-goat.dto';

export interface GoatsRepository {
  create(data: CreateGoatDTO & { userId: string }): Promise<Goat>;
  findById(id: string): Promise<Goat | null>;
  findAll(): Promise<Goat[]>;
  findByUserId(userId: string): Promise<Goat[]>;
  updateById(id: string, data: UpdateGoatDTO): Promise<Goat>;
  deleteById(id: string): Promise<void>;
}
