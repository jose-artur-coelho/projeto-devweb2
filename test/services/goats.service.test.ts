import { GoatsService } from '../../src/services/goats.service';
import { GoatsRepository } from '../../src/db/repository/goats/goats.repository';
import { CreateGoatDTO } from '../../src/models/dto/goat/create-goat.dto';
import { UpdateGoatDTO } from '../../src/models/dto/goat/update-goat.dto';
import { Goat } from '../../src/models/goat';

describe('GoatsService', () => {
  let goatsService: GoatsService;
  let mockGoatsRepository: jest.Mocked<GoatsRepository>;

  beforeEach(() => {
    mockGoatsRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    };
    goatsService = new GoatsService(mockGoatsRepository);
  });

  describe('criar cabra', () => {
    it('deve criar uma cabra com sucesso', async () => {
      const userId = 'user-1';
      const createDTO: CreateGoatDTO = {
        name: 'Bella',
        race: 'SAANEN',
        birthDate: '2023-03-10',
      };

      const expectedGoat: Goat = {
        id: 'goat-1',
        name: 'Bella',
        race: 'SAANEN',
        birthDate: new Date('2023-03-10'),
        userId: 'user-1',
      };

      mockGoatsRepository.create.mockResolvedValue(expectedGoat);

      const result = await goatsService.create(createDTO, userId);

      expect(mockGoatsRepository.create).toHaveBeenCalledWith({
        ...createDTO,
        userId,
      });
      expect(result).toEqual(expectedGoat);
    });
  });

  describe('atualizar cabra', () => {
    it('deve atualizar uma cabra com sucesso', async () => {
      const goatId = 'goat-1';
      const updateDTO: UpdateGoatDTO = {
        name: 'Bella Updated',
        race: 'BOER',
      };

      const existingGoat: Goat = {
        id: goatId,
        name: 'Bella',
        race: 'SAANEN',
        birthDate: new Date('2023-03-10'),
        userId: 'user-1',
      };

      const updatedGoat: Goat = {
        ...existingGoat,
        name: 'Bella Updated',
        race: 'BOER',
      };

      mockGoatsRepository.findById.mockResolvedValue(existingGoat);
      mockGoatsRepository.updateById.mockResolvedValue(updatedGoat);

      const result = await goatsService.update(goatId, updateDTO);

      expect(mockGoatsRepository.findById).toHaveBeenCalledWith(goatId);
      expect(mockGoatsRepository.updateById).toHaveBeenCalledWith(
        goatId,
        updateDTO
      );
      expect(result).toEqual(updatedGoat);
    });

    it('deve lançar erro se cabra não for encontrada para atualização', async () => {
      const goatId = 'goat-1';
      const updateDTO: UpdateGoatDTO = {
        name: 'Bella Updated',
      };

      mockGoatsRepository.findById.mockResolvedValue(null);

      await expect(goatsService.update(goatId, updateDTO)).rejects.toThrow(
        'Cabra não encontrada.'
      );

      expect(mockGoatsRepository.findById).toHaveBeenCalledWith(goatId);
      expect(mockGoatsRepository.updateById).not.toHaveBeenCalled();
    });
  });

  describe('buscar cabra', () => {
    it('deve retornar uma cabra por id', async () => {
      const goatId = 'goat-1';
      const expectedGoat: Goat = {
        id: goatId,
        name: 'Bella',
        race: 'SAANEN',
        birthDate: new Date('2023-03-10'),
        userId: 'user-1',
      };

      mockGoatsRepository.findById.mockResolvedValue(expectedGoat);

      const result = await goatsService.find(goatId);

      expect(mockGoatsRepository.findById).toHaveBeenCalledWith(goatId);
      expect(result).toEqual(expectedGoat);
    });

    it('deve lançar erro se cabra não for encontrada', async () => {
      const goatId = 'goat-1';

      mockGoatsRepository.findById.mockResolvedValue(null);

      await expect(goatsService.find(goatId)).rejects.toThrow(
        'Cabra não encontrada.'
      );

      expect(mockGoatsRepository.findById).toHaveBeenCalledWith(goatId);
    });
  });

  describe('buscar todas as cabras', () => {
    it('deve retornar todas as cabras', async () => {
      const expectedGoats: Goat[] = [
        {
          id: 'goat-1',
          name: 'Bella',
          race: 'SAANEN',
          birthDate: new Date('2023-03-10'),
          userId: 'user-1',
        },
        {
          id: 'goat-2',
          name: 'Luna',
          race: 'BOER',
          birthDate: new Date('2022-11-15'),
          userId: 'user-2',
        },
      ];

      mockGoatsRepository.findAll.mockResolvedValue(expectedGoats);

      const result = await goatsService.findAll();

      expect(mockGoatsRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedGoats);
    });
  });

  describe('buscar cabras por usuário', () => {
    it('deve retornar cabras por id do usuário', async () => {
      const userId = 'user-1';
      const expectedGoats: Goat[] = [
        {
          id: 'goat-1',
          name: 'Bella',
          race: 'SAANEN',
          birthDate: new Date('2023-03-10'),
          userId: 'user-1',
        },
      ];

      mockGoatsRepository.findByUserId.mockResolvedValue(expectedGoats);

      const result = await goatsService.findByUserId(userId);

      expect(mockGoatsRepository.findByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedGoats);
    });
  });

  describe('deletar cabra', () => {
    it('deve deletar uma cabra com sucesso', async () => {
      const goatId = 'goat-1';

      const existingGoat: Goat = {
        id: goatId,
        name: 'Bella',
        race: 'SAANEN',
        birthDate: new Date('2023-03-10'),
        userId: 'user-1',
      };

      mockGoatsRepository.findById.mockResolvedValue(existingGoat);
      mockGoatsRepository.deleteById.mockResolvedValue();

      await goatsService.delete(goatId);

      expect(mockGoatsRepository.findById).toHaveBeenCalledWith(goatId);
      expect(mockGoatsRepository.deleteById).toHaveBeenCalledWith(goatId);
    });

    it('deve lançar erro se cabra não for encontrada para exclusão', async () => {
      const goatId = 'goat-1';

      mockGoatsRepository.findById.mockResolvedValue(null);

      await expect(goatsService.delete(goatId)).rejects.toThrow(
        'Cabra não encontrada.'
      );

      expect(mockGoatsRepository.findById).toHaveBeenCalledWith(goatId);
      expect(mockGoatsRepository.deleteById).not.toHaveBeenCalled();
    });
  });
});
