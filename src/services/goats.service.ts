import { GoatsRepository } from '../db/repository/goats/goats.repository';
import { CreateGoatDTO } from '../models/dto/goat/create-goat.dto';
import { UpdateGoatDTO } from '../models/dto/goat/update-goat.dto';

export class GoatsService {
  constructor(private readonly goatsRepository: GoatsRepository) {
    this.goatsRepository = goatsRepository;
  }

  async create(dto: CreateGoatDTO, userId: string) {
    const createdGoat = await this.goatsRepository.create({
      ...dto,
      userId,
    });

    return createdGoat;
  }

  async update(id: string, dto: UpdateGoatDTO) {
    const goat = await this.goatsRepository.findById(id);
    if (!goat) {
      throw new Error('Cabra não encontrada.');
    }

    const updatedGoat = await this.goatsRepository.updateById(id, dto);
    return updatedGoat;
  }

  async find(id: string) {
    const goat = await this.goatsRepository.findById(id);
    if (!goat) {
      throw new Error('Cabra não encontrada.');
    }
    return goat;
  }

  async findAll() {
    const goats = await this.goatsRepository.findAll();
    return goats;
  }

  async findByUserId(userId: string) {
    const goats = await this.goatsRepository.findByUserId(userId);
    return goats;
  }

  async delete(id: string) {
    const goat = await this.goatsRepository.findById(id);
    if (!goat) {
      throw new Error('Cabra não encontrada.');
    }

    await this.goatsRepository.deleteById(id);
  }
}
