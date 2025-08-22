import { DailyCostsService } from '../../src/services/daily-costs.service';
import { DailyCostsRepository } from '../../src/db/repository/daily-costs/daily-costs.repository';
import { CreateDailyCostsDTO } from '../../src/models/dto/daily-costs/create-daily-costs.dto';
import { UpdateDailyCostsDTO } from '../../src/models/dto/daily-costs/update-daily-costs.dto';
import { DailyCosts } from '../../src/models/daily-costs';

describe('DailyCostsService', () => {
  let dailyCostsService: DailyCostsService;
  let mockDailyCostsRepository: jest.Mocked<DailyCostsRepository>;

  beforeEach(() => {
    mockDailyCostsRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      findByDateAndUserId: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    };
    dailyCostsService = new DailyCostsService(mockDailyCostsRepository);
  });

  describe('criar custos diários', () => {
    it('deve criar custos diários com sucesso', async () => {
      const userId = 'user-1';
      const createDTO: CreateDailyCostsDTO = {
        date: '2025-08-19',
        laborCosts: 150.0,
        feedCosts: 300.5,
      };

      const expectedCosts: DailyCosts = {
        id: 'costs-1',
        date: new Date('2025-08-19'),
        laborCosts: 150.0,
        feedCosts: 300.5,
        userId: 'user-1',
      };

      mockDailyCostsRepository.findByDateAndUserId.mockResolvedValue(null);
      mockDailyCostsRepository.create.mockResolvedValue(expectedCosts);

      const result = await dailyCostsService.create(createDTO, userId);

      expect(mockDailyCostsRepository.findByDateAndUserId).toHaveBeenCalledWith(
        new Date('2025-08-19'),
        userId
      );
      expect(mockDailyCostsRepository.create).toHaveBeenCalledWith({
        ...createDTO,
        userId,
      });
      expect(result).toEqual(expectedCosts);
    });

    it('should throw error if costs already exist for date and user', async () => {
      const userId = 'user-1';
      const createDTO: CreateDailyCostsDTO = {
        date: '2025-08-19',
        laborCosts: 150.0,
        feedCosts: 300.5,
      };

      const existingCosts: DailyCosts = {
        id: 'existing-costs',
        date: new Date('2025-08-19'),
        laborCosts: 100.0,
        feedCosts: 200.0,
        userId: 'user-1',
      };

      mockDailyCostsRepository.findByDateAndUserId.mockResolvedValue(
        existingCosts
      );

      await expect(dailyCostsService.create(createDTO, userId)).rejects.toThrow(
        'Já existem custos registrados para esta data.'
      );
    });
  });

  describe('update', () => {
    it('should update daily costs successfully', async () => {
      const costsId = 'costs-1';
      const userId = 'user-1';
      const updateDTO: UpdateDailyCostsDTO = {
        laborCosts: 175.0,
        feedCosts: 320.75,
      };

      const existingCosts: DailyCosts = {
        id: costsId,
        date: new Date('2025-08-19'),
        laborCosts: 150.0,
        feedCosts: 300.5,
        userId: 'user-1',
      };

      const updatedCosts: DailyCosts = {
        ...existingCosts,
        laborCosts: 175.0,
        feedCosts: 320.75,
      };

      mockDailyCostsRepository.findById.mockResolvedValue(existingCosts);
      mockDailyCostsRepository.updateById.mockResolvedValue(updatedCosts);

      const result = await dailyCostsService.update(costsId, updateDTO, userId);

      expect(mockDailyCostsRepository.findById).toHaveBeenCalledWith(costsId);
      expect(mockDailyCostsRepository.updateById).toHaveBeenCalledWith(
        costsId,
        updateDTO
      );
      expect(result).toEqual(updatedCosts);
    });

    it('should throw error if costs not found', async () => {
      const costsId = 'costs-1';
      const userId = 'user-1';
      const updateDTO: UpdateDailyCostsDTO = {
        laborCosts: 175.0,
      };

      mockDailyCostsRepository.findById.mockResolvedValue(null);

      await expect(
        dailyCostsService.update(costsId, updateDTO, userId)
      ).rejects.toThrow('Custos diários não encontrados.');
    });

    it('should throw error if user is not the owner', async () => {
      const costsId = 'costs-1';
      const userId = 'user-1';
      const updateDTO: UpdateDailyCostsDTO = {
        laborCosts: 175.0,
      };

      const existingCosts: DailyCosts = {
        id: costsId,
        date: new Date('2025-08-19'),
        laborCosts: 150.0,
        feedCosts: 300.5,
        userId: 'other-user',
      };

      mockDailyCostsRepository.findById.mockResolvedValue(existingCosts);

      await expect(
        dailyCostsService.update(costsId, updateDTO, userId)
      ).rejects.toThrow('Você não tem permissão para editar estes custos.');
    });
  });

  describe('find', () => {
    it('should return daily costs by id', async () => {
      const costsId = 'costs-1';
      const expectedCosts: DailyCosts = {
        id: costsId,
        date: new Date('2025-08-19'),
        laborCosts: 150.0,
        feedCosts: 300.5,
        userId: 'user-1',
      };

      mockDailyCostsRepository.findById.mockResolvedValue(expectedCosts);

      const result = await dailyCostsService.find(costsId);

      expect(mockDailyCostsRepository.findById).toHaveBeenCalledWith(costsId);
      expect(result).toEqual(expectedCosts);
    });

    it('should throw error if costs not found', async () => {
      const costsId = 'costs-1';

      mockDailyCostsRepository.findById.mockResolvedValue(null);

      await expect(dailyCostsService.find(costsId)).rejects.toThrow(
        'Custos diários não encontrados.'
      );
    });
  });

  describe('findAll', () => {
    it('should return all daily costs', async () => {
      const expectedCosts: DailyCosts[] = [
        {
          id: 'costs-1',
          date: new Date('2025-08-19'),
          laborCosts: 150.0,
          feedCosts: 300.5,
          userId: 'user-1',
        },
        {
          id: 'costs-2',
          date: new Date('2025-08-20'),
          laborCosts: 175.0,
          feedCosts: 320.75,
          userId: 'user-2',
        },
      ];

      mockDailyCostsRepository.findAll.mockResolvedValue(expectedCosts);

      const result = await dailyCostsService.findAll();

      expect(mockDailyCostsRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedCosts);
    });
  });

  describe('findByUserId', () => {
    it('should return daily costs by user id', async () => {
      const userId = 'user-1';
      const expectedCosts: DailyCosts[] = [
        {
          id: 'costs-1',
          date: new Date('2025-08-19'),
          laborCosts: 150.0,
          feedCosts: 300.5,
          userId: 'user-1',
        },
      ];

      mockDailyCostsRepository.findByUserId.mockResolvedValue(expectedCosts);

      const result = await dailyCostsService.findByUserId(userId);

      expect(mockDailyCostsRepository.findByUserId).toHaveBeenCalledWith(
        userId
      );
      expect(result).toEqual(expectedCosts);
    });
  });

  describe('delete', () => {
    it('should delete daily costs successfully', async () => {
      const costsId = 'costs-1';
      const userId = 'user-1';

      const existingCosts: DailyCosts = {
        id: costsId,
        date: new Date('2025-08-19'),
        laborCosts: 150.0,
        feedCosts: 300.5,
        userId: 'user-1',
      };

      mockDailyCostsRepository.findById.mockResolvedValue(existingCosts);
      mockDailyCostsRepository.deleteById.mockResolvedValue();

      await dailyCostsService.delete(costsId, userId);

      expect(mockDailyCostsRepository.findById).toHaveBeenCalledWith(costsId);
      expect(mockDailyCostsRepository.deleteById).toHaveBeenCalledWith(costsId);
    });

    it('should throw error if costs not found for deletion', async () => {
      const costsId = 'costs-1';
      const userId = 'user-1';

      mockDailyCostsRepository.findById.mockResolvedValue(null);

      await expect(dailyCostsService.delete(costsId, userId)).rejects.toThrow(
        'Custos diários não encontrados.'
      );
    });

    it('should throw error if user is not the owner for deletion', async () => {
      const costsId = 'costs-1';
      const userId = 'user-1';

      const existingCosts: DailyCosts = {
        id: costsId,
        date: new Date('2025-08-19'),
        laborCosts: 150.0,
        feedCosts: 300.5,
        userId: 'other-user',
      };

      mockDailyCostsRepository.findById.mockResolvedValue(existingCosts);

      await expect(dailyCostsService.delete(costsId, userId)).rejects.toThrow(
        'Você não tem permissão para deletar estes custos.'
      );
    });
  });
});
