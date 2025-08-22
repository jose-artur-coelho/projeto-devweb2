import { CowUpdatesService } from '../../src/services/cow-updates.service';
import { CowUpdatesRepository } from '../../src/db/repository/cow-updates/cow-updates.repository';
import { CreateCowUpdateDTO } from '../../src/models/dto/cow-update/create-cow-update.dto';
import { UpdateCowUpdateDTO } from '../../src/models/dto/cow-update/update-cow-update.dto';
import { CowUpdate } from '../../src/models/cow-update';

describe('CowUpdatesService', () => {
  let cowUpdatesService: CowUpdatesService;
  let mockCowUpdatesRepository: jest.Mocked<CowUpdatesRepository>;

  beforeEach(() => {
    mockCowUpdatesRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      findByDateAndCowId: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    };
    cowUpdatesService = new CowUpdatesService(mockCowUpdatesRepository);
  });

  describe('criar atualização de vaca', () => {
    it('deve criar uma atualização de vaca com sucesso', async () => {
      const userId = 'user-1';
      const createDTO: CreateCowUpdateDTO = {
        date: '2025-08-19',
        sick: false,
        milkQuantity: 15.5,
        cowId: 'cow-1',
      };

      const expectedUpdate: CowUpdate = {
        id: 'update-1',
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 15.5,
        cowId: 'cow-1',
        userId: 'user-1',
      };

      mockCowUpdatesRepository.findByDateAndCowId.mockResolvedValue(null);
      mockCowUpdatesRepository.create.mockResolvedValue(expectedUpdate);

      const result = await cowUpdatesService.create(createDTO, userId);

      expect(mockCowUpdatesRepository.findByDateAndCowId).toHaveBeenCalledWith(
        new Date('2025-08-19'),
        'cow-1'
      );
      expect(mockCowUpdatesRepository.create).toHaveBeenCalledWith({
        ...createDTO,
        userId,
      });
      expect(result).toEqual(expectedUpdate);
    });

    it('deve lançar erro se atualização já existir para data e vaca', async () => {
      const userId = 'user-1';
      const createDTO: CreateCowUpdateDTO = {
        date: '2025-08-19',
        sick: false,
        milkQuantity: 15.5,
        cowId: 'cow-1',
      };

      const existingUpdate: CowUpdate = {
        id: 'existing-update',
        date: new Date('2025-08-19'),
        sick: true,
        milkQuantity: 10.0,
        cowId: 'cow-1',
        userId: 'user-1',
      };

      mockCowUpdatesRepository.findByDateAndCowId.mockResolvedValue(
        existingUpdate
      );

      await expect(cowUpdatesService.create(createDTO, userId)).rejects.toThrow(
        'Já existe uma atualização para esta vaca na data informada.'
      );
    });
  });

  describe('atualizar atualização de vaca', () => {
    it('deve atualizar uma atualização de vaca com sucesso', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';
      const updateDTO: UpdateCowUpdateDTO = {
        sick: true,
        milkQuantity: 12.0,
      };

      const existingUpdate: CowUpdate = {
        id: updateId,
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 15.5,
        cowId: 'cow-1',
        userId: 'user-1',
      };

      const updatedUpdate: CowUpdate = {
        ...existingUpdate,
        sick: true,
        milkQuantity: 12.0,
      };

      mockCowUpdatesRepository.findById.mockResolvedValue(existingUpdate);
      mockCowUpdatesRepository.updateById.mockResolvedValue(updatedUpdate);

      const result = await cowUpdatesService.update(
        updateId,
        updateDTO,
        userId
      );

      expect(mockCowUpdatesRepository.findById).toHaveBeenCalledWith(updateId);
      expect(mockCowUpdatesRepository.updateById).toHaveBeenCalledWith(
        updateId,
        updateDTO
      );
      expect(result).toEqual(updatedUpdate);
    });

    it('deve lançar erro se atualização não for encontrada', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';
      const updateDTO: UpdateCowUpdateDTO = {
        sick: true,
      };

      mockCowUpdatesRepository.findById.mockResolvedValue(null);

      await expect(
        cowUpdatesService.update(updateId, updateDTO, userId)
      ).rejects.toThrow('Atualização da vaca não encontrada.');
    });

    it('deve lançar erro se usuário não for o proprietário', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';
      const updateDTO: UpdateCowUpdateDTO = {
        sick: true,
      };

      const existingUpdate: CowUpdate = {
        id: updateId,
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 15.5,
        cowId: 'cow-1',
        userId: 'other-user',
      };

      mockCowUpdatesRepository.findById.mockResolvedValue(existingUpdate);

      await expect(
        cowUpdatesService.update(updateId, updateDTO, userId)
      ).rejects.toThrow('Você não tem permissão para editar esta atualização.');
    });
  });

  describe('buscar atualização de vaca', () => {
    it('deve retornar uma atualização de vaca por id', async () => {
      const updateId = 'update-1';
      const expectedUpdate: CowUpdate = {
        id: updateId,
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 15.5,
        cowId: 'cow-1',
        userId: 'user-1',
      };

      mockCowUpdatesRepository.findById.mockResolvedValue(expectedUpdate);

      const result = await cowUpdatesService.find(updateId);

      expect(mockCowUpdatesRepository.findById).toHaveBeenCalledWith(updateId);
      expect(result).toEqual(expectedUpdate);
    });

    it('deve lançar erro se atualização não for encontrada', async () => {
      const updateId = 'update-1';

      mockCowUpdatesRepository.findById.mockResolvedValue(null);

      await expect(cowUpdatesService.find(updateId)).rejects.toThrow(
        'Atualização da vaca não encontrada.'
      );
    });
  });

  describe('buscar todas as atualizações de vacas', () => {
    it('deve retornar todas as atualizações de vacas', async () => {
      const expectedUpdates: CowUpdate[] = [
        {
          id: 'update-1',
          date: new Date('2025-08-19'),
          sick: false,
          milkQuantity: 15.5,
          cowId: 'cow-1',
          userId: 'user-1',
        },
        {
          id: 'update-2',
          date: new Date('2025-08-20'),
          sick: true,
          milkQuantity: 10.0,
          cowId: 'cow-2',
          userId: 'user-2',
        },
      ];

      mockCowUpdatesRepository.findAll.mockResolvedValue(expectedUpdates);

      const result = await cowUpdatesService.findAll();

      expect(mockCowUpdatesRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedUpdates);
    });
  });

  describe('buscar atualizações de vacas por usuário', () => {
    it('deve retornar atualizações de vacas por id do usuário', async () => {
      const userId = 'user-1';
      const expectedUpdates: CowUpdate[] = [
        {
          id: 'update-1',
          date: new Date('2025-08-19'),
          sick: false,
          milkQuantity: 15.5,
          cowId: 'cow-1',
          userId: 'user-1',
        },
      ];

      mockCowUpdatesRepository.findByUserId.mockResolvedValue(expectedUpdates);

      const result = await cowUpdatesService.findByUserId(userId);

      expect(mockCowUpdatesRepository.findByUserId).toHaveBeenCalledWith(
        userId
      );
      expect(result).toEqual(expectedUpdates);
    });
  });

  describe('deletar atualização de vaca', () => {
    it('deve deletar uma atualização de vaca com sucesso', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';

      const existingUpdate: CowUpdate = {
        id: updateId,
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 15.5,
        cowId: 'cow-1',
        userId: 'user-1',
      };

      mockCowUpdatesRepository.findById.mockResolvedValue(existingUpdate);
      mockCowUpdatesRepository.deleteById.mockResolvedValue();

      await cowUpdatesService.delete(updateId, userId);

      expect(mockCowUpdatesRepository.findById).toHaveBeenCalledWith(updateId);
      expect(mockCowUpdatesRepository.deleteById).toHaveBeenCalledWith(
        updateId
      );
    });

    it('deve lançar erro se atualização não for encontrada para exclusão', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';

      mockCowUpdatesRepository.findById.mockResolvedValue(null);

      await expect(cowUpdatesService.delete(updateId, userId)).rejects.toThrow(
        'Atualização da vaca não encontrada.'
      );
    });

    it('deve lançar erro se usuário não for o proprietário para exclusão', async () => {
      const updateId = 'update-1';
      const userId = 'user-1';

      const existingUpdate: CowUpdate = {
        id: updateId,
        date: new Date('2025-08-19'),
        sick: false,
        milkQuantity: 15.5,
        cowId: 'cow-1',
        userId: 'other-user',
      };

      mockCowUpdatesRepository.findById.mockResolvedValue(existingUpdate);

      await expect(cowUpdatesService.delete(updateId, userId)).rejects.toThrow(
        'Você não tem permissão para deletar esta atualização.'
      );
    });
  });
});
