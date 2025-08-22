import { GoatUpdatesService } from '../../src/services/goat-updates.service';
import { GoatUpdatesRepository } from '../../src/db/repository/goat-updates/goat-updates.repository';
import { CreateGoatUpdateDTO } from '../../src/models/dto/goat-update/create-goat-update.dto';
import { UpdateGoatUpdateDTO } from '../../src/models/dto/goat-update/update-goat-update.dto';
import { GoatUpdate } from '../../src/models/goat-update';

describe('GoatUpdatesService', () => {
  let goatUpdatesService: GoatUpdatesService;
  let mockGoatUpdatesRepository: jest.Mocked<GoatUpdatesRepository>;

  beforeEach(() => {
    mockGoatUpdatesRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      findByDateAndGoatId: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    };
    goatUpdatesService = new GoatUpdatesService(mockGoatUpdatesRepository);
  });

  describe('criar atualização de cabra', () => {
    it('deve criar uma atualização de cabra com sucesso', async () => {
      const userId = 'user-1';
      const createDTO: CreateGoatUpdateDTO = {
        date: '2025-08-19',
        sick: false,
        milkQuantity: 3.2,
        goatId: 'goat-1',
      };

      const expectedUpdate: GoatUpdate = {
        id: 'update-1',
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 3.2,
        goatId: 'goat-1',
        userId: 'user-1',
      };

      mockGoatUpdatesRepository.findByDateAndGoatId.mockResolvedValue(null);
      mockGoatUpdatesRepository.create.mockResolvedValue(expectedUpdate);

      const result = await goatUpdatesService.create(createDTO, userId);

      expect(
        mockGoatUpdatesRepository.findByDateAndGoatId
      ).toHaveBeenCalledWith(new Date('2025-08-19'), 'goat-1');
      expect(mockGoatUpdatesRepository.create).toHaveBeenCalledWith({
        ...createDTO,
        userId,
      });
      expect(result).toEqual(expectedUpdate);
    });

    it('deve lançar erro se atualização já existir para data e cabra', async () => {
      const userId = 'user-1';
      const createDTO: CreateGoatUpdateDTO = {
        date: '2025-08-19',
        sick: false,
        milkQuantity: 3.2,
        goatId: 'goat-1',
      };

      const existingUpdate: GoatUpdate = {
        id: 'existing-update',
        date: new Date('2025-08-19'),
        sick: true,
        milkQuantity: 2.8,
        goatId: 'goat-1',
        userId: 'user-1',
      };

      mockGoatUpdatesRepository.findByDateAndGoatId.mockResolvedValue(
        existingUpdate
      );

      await expect(
        goatUpdatesService.create(createDTO, userId)
      ).rejects.toThrow(
        'Já existe uma atualização para esta cabra na data informada.'
      );
    });
  });

  describe('atualizar atualização de cabra', () => {
    it('deve atualizar uma atualização de cabra com sucesso', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';
      const updateDTO: UpdateGoatUpdateDTO = {
        sick: true,
        milkQuantity: 2.8,
      };

      const existingUpdate: GoatUpdate = {
        id: updateId,
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 3.2,
        goatId: 'goat-1',
        userId: 'user-1',
      };

      const updatedUpdate: GoatUpdate = {
        ...existingUpdate,
        sick: true,
        milkQuantity: 2.8,
      };

      mockGoatUpdatesRepository.findById.mockResolvedValue(existingUpdate);
      mockGoatUpdatesRepository.updateById.mockResolvedValue(updatedUpdate);

      const result = await goatUpdatesService.update(
        updateId,
        updateDTO,
        userId
      );

      expect(mockGoatUpdatesRepository.findById).toHaveBeenCalledWith(updateId);
      expect(mockGoatUpdatesRepository.updateById).toHaveBeenCalledWith(
        updateId,
        updateDTO
      );
      expect(result).toEqual(updatedUpdate);
    });

    it('deve lançar erro se atualização não for encontrada', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';
      const updateDTO: UpdateGoatUpdateDTO = {
        sick: true,
      };

      mockGoatUpdatesRepository.findById.mockResolvedValue(null);

      await expect(
        goatUpdatesService.update(updateId, updateDTO, userId)
      ).rejects.toThrow('Atualização da cabra não encontrada.');
    });

    it('deve lançar erro se usuário não for o proprietário', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';
      const updateDTO: UpdateGoatUpdateDTO = {
        sick: true,
      };

      const existingUpdate: GoatUpdate = {
        id: updateId,
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 3.2,
        goatId: 'goat-1',
        userId: 'other-user',
      };

      mockGoatUpdatesRepository.findById.mockResolvedValue(existingUpdate);

      await expect(
        goatUpdatesService.update(updateId, updateDTO, userId)
      ).rejects.toThrow('Você não tem permissão para editar esta atualização.');
    });
  });

  describe('buscar atualização de cabra', () => {
    it('should return a goat update by id', async () => {
      const updateId = 'update-1';
      const expectedUpdate: GoatUpdate = {
        id: updateId,
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 3.2,
        goatId: 'goat-1',
        userId: 'user-1',
      };

      mockGoatUpdatesRepository.findById.mockResolvedValue(expectedUpdate);

      const result = await goatUpdatesService.find(updateId);

      expect(mockGoatUpdatesRepository.findById).toHaveBeenCalledWith(updateId);
      expect(result).toEqual(expectedUpdate);
    });

    it('deve lançar erro se atualização não for encontrada', async () => {
      const updateId = 'update-1';

      mockGoatUpdatesRepository.findById.mockResolvedValue(null);

      await expect(goatUpdatesService.find(updateId)).rejects.toThrow(
        'Atualização da cabra não encontrada.'
      );
    });
  });

  describe('findAll', () => {
    it('should return all goat updates', async () => {
      const expectedUpdates: GoatUpdate[] = [
        {
          id: 'update-1',
          date: new Date('2025-08-19'),
          sick: false,
          milkQuantity: 3.2,
          goatId: 'goat-1',
          userId: 'user-1',
        },
        {
          id: 'update-2',
          date: new Date('2025-08-20'),
          sick: true,
          milkQuantity: 2.8,
          goatId: 'goat-2',
          userId: 'user-2',
        },
      ];

      mockGoatUpdatesRepository.findAll.mockResolvedValue(expectedUpdates);

      const result = await goatUpdatesService.findAll();

      expect(mockGoatUpdatesRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedUpdates);
    });
  });

  describe('findByUserId', () => {
    it('should return goat updates by user id', async () => {
      const userId = 'user-1';
      const expectedUpdates: GoatUpdate[] = [
        {
          id: 'update-1',
          date: new Date('2025-08-19'),
          sick: false,
          milkQuantity: 3.2,
          goatId: 'goat-1',
          userId: 'user-1',
        },
      ];

      mockGoatUpdatesRepository.findByUserId.mockResolvedValue(expectedUpdates);

      const result = await goatUpdatesService.findByUserId(userId);

      expect(mockGoatUpdatesRepository.findByUserId).toHaveBeenCalledWith(
        userId
      );
      expect(result).toEqual(expectedUpdates);
    });
  });

  describe('delete', () => {
    it('should delete a goat update successfully', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';

      const existingUpdate: GoatUpdate = {
        id: updateId,
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 3.2,
        goatId: 'goat-1',
        userId: 'user-1',
      };

      mockGoatUpdatesRepository.findById.mockResolvedValue(existingUpdate);
      mockGoatUpdatesRepository.deleteById.mockResolvedValue();

      await goatUpdatesService.delete(updateId, userId);

      expect(mockGoatUpdatesRepository.findById).toHaveBeenCalledWith(updateId);
      expect(mockGoatUpdatesRepository.deleteById).toHaveBeenCalledWith(
        updateId
      );
    });

    it('deve lançar erro se atualização não for encontrada for deletion', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';

      mockGoatUpdatesRepository.findById.mockResolvedValue(null);

      await expect(goatUpdatesService.delete(updateId, userId)).rejects.toThrow(
        'Atualização da cabra não encontrada.'
      );
    });

    it('deve lançar erro se usuário não for o proprietário for deletion', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';

      const existingUpdate: GoatUpdate = {
        id: updateId,
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 3.2,
        goatId: 'goat-1',
        userId: 'other-user',
      };

      mockGoatUpdatesRepository.findById.mockResolvedValue(existingUpdate);

      await expect(goatUpdatesService.delete(updateId, userId)).rejects.toThrow(
        'Você não tem permissão para deletar esta atualização.'
      );
    });
  });
});
