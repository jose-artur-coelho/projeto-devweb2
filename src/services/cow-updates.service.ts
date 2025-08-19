import { CowUpdatesRepository } from '../db/repository/cow-updates/cow-updates.repository';
import { CreateCowUpdateDTO } from '../models/dto/cow-update/create-cow-update.dto';
import { UpdateCowUpdateDTO } from '../models/dto/cow-update/update-cow-update.dto';

export class CowUpdatesService {
  constructor(private readonly cowUpdatesRepository: CowUpdatesRepository) {
    this.cowUpdatesRepository = cowUpdatesRepository;
  }

  async create(dto: CreateCowUpdateDTO, userId: string) {
    const existingUpdate = await this.cowUpdatesRepository.findByDateAndCowId(
      new Date(dto.date),
      dto.cowId
    );

    if (existingUpdate) {
      throw new Error(
        'Já existe uma atualização para esta vaca na data informada.'
      );
    }

    const createdUpdate = await this.cowUpdatesRepository.create({
      ...dto,
      userId,
    });

    return createdUpdate;
  }

  async update(id: string, dto: UpdateCowUpdateDTO, userId: string) {
    const update = await this.cowUpdatesRepository.findById(id);
    if (!update) {
      throw new Error('Atualização da vaca não encontrada.');
    }

    if (update.userId !== userId) {
      throw new Error('Você não tem permissão para editar esta atualização.');
    }

    const updatedUpdate = await this.cowUpdatesRepository.updateById(id, dto);
    return updatedUpdate;
  }

  async find(id: string) {
    const update = await this.cowUpdatesRepository.findById(id);
    if (!update) {
      throw new Error('Atualização da vaca não encontrada.');
    }
    return update;
  }

  async findAll() {
    const updates = await this.cowUpdatesRepository.findAll();
    return updates;
  }

  async findByUserId(userId: string) {
    const updates = await this.cowUpdatesRepository.findByUserId(userId);
    return updates;
  }

  async delete(id: string, userId: string) {
    const update = await this.cowUpdatesRepository.findById(id);
    if (!update) {
      throw new Error('Atualização da vaca não encontrada.');
    }

    if (update.userId !== userId) {
      throw new Error('Você não tem permissão para deletar esta atualização.');
    }

    await this.cowUpdatesRepository.deleteById(id);
  }
}
