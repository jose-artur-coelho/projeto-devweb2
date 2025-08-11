import { CowsRepository } from '../db/repository/cows/cows.repository';
import { CreateCowDTO } from '../models/dto/cow/create-cow.dto';
import { UpdateCowDTO } from '../models/dto/cow/update-cow.dto';

export class CowsService {
  constructor(private readonly cowsRepository: CowsRepository) {
    this.cowsRepository = cowsRepository;
  }

  async create(dto: CreateCowDTO, userId: string) {
    const createdCow = await this.cowsRepository.create({
      ...dto,
      userId,
    });

    return createdCow;
  }

  async update(id: string, dto: UpdateCowDTO) {
    const cow = await this.cowsRepository.findById(id);
    if (!cow) {
      throw new Error('Vaca não encontrada.');
    }

    const updatedCow = await this.cowsRepository.updateById(id, dto);
    return updatedCow;
  }

  async find(id: string) {
    const cow = await this.cowsRepository.findById(id);
    if (!cow) {
      throw new Error('Vaca não encontrada.');
    }
    return cow;
  }

  async findAll() {
    const cows = await this.cowsRepository.findAll();
    return cows;
  }

  async findByUserId(userId: string) {
    const cows = await this.cowsRepository.findByUserId(userId);
    return cows;
  }

  async delete(id: string) {
    const cow = await this.cowsRepository.findById(id);
    if (!cow) {
      throw new Error('Vaca não encontrada.');
    }

    await this.cowsRepository.deleteById(id);
  }
}
