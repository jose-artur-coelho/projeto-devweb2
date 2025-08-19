import { GoatUpdatesRepository } from '../db/repository/goat-updates/goat-updates.repository';
import { CreateGoatUpdateDTO } from '../models/dto/goat-update/create-goat-update.dto';
import { UpdateGoatUpdateDTO } from '../models/dto/goat-update/update-goat-update.dto';

export class GoatUpdatesService {
  constructor(private readonly goatUpdatesRepository: GoatUpdatesRepository) {
    this.goatUpdatesRepository = goatUpdatesRepository;
  }

  async create(dto: CreateGoatUpdateDTO, userId: string) {
    const existingUpdate = await this.goatUpdatesRepository.findByDateAndGoatId(
      new Date(dto.date),
      dto.goatId
    );

    if (existingUpdate) {
      throw new Error(
        'Já existe uma atualização para esta cabra na data informada.'
      );
    }

    const createdUpdate = await this.goatUpdatesRepository.create({
      ...dto,
      userId,
    });

    return createdUpdate;
  }

  async update(id: string, dto: UpdateGoatUpdateDTO, userId: string) {
    const update = await this.goatUpdatesRepository.findById(id);
    if (!update) {
      throw new Error('Atualização da cabra não encontrada.');
    }

    if (update.userId !== userId) {
      throw new Error('Você não tem permissão para editar esta atualização.');
    }

    const updatedUpdate = await this.goatUpdatesRepository.updateById(id, dto);
    return updatedUpdate;
  }

  async find(id: string) {
    const update = await this.goatUpdatesRepository.findById(id);
    if (!update) {
      throw new Error('Atualização da cabra não encontrada.');
    }
    return update;
  }

  async findAll() {
    const updates = await this.goatUpdatesRepository.findAll();
    return updates;
  }

  async findByUserId(userId: string) {
    const updates = await this.goatUpdatesRepository.findByUserId(userId);
    return updates;
  }

  async delete(id: string, userId: string) {
    const update = await this.goatUpdatesRepository.findById(id);
    if (!update) {
      throw new Error('Atualização da cabra não encontrada.');
    }

    if (update.userId !== userId) {
      throw new Error('Você não tem permissão para deletar esta atualização.');
    }

    await this.goatUpdatesRepository.deleteById(id);
  }
}
