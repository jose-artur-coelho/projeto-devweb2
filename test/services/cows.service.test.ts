import { CowsService } from '../../src/services/cows.service';
import { CowsRepository } from '../../src/db/repository/cows/cows.repository';
import { CreateCowDTO } from '../../src/models/dto/cow/create-cow.dto';
import { UpdateCowDTO } from '../../src/models/dto/cow/update-cow.dto';
import { Cow } from '../../src/models/cow';

describe('CowsService', () => {
  let cowsService: CowsService;
  let mockCowsRepository: jest.Mocked<CowsRepository>;

  beforeEach(() => {
    mockCowsRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByUserId: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    };
    cowsService = new CowsService(mockCowsRepository);
  });

  describe('criar vaca', () => {
    it('deve criar uma vaca com sucesso', async () => {
      const userId = 'user-1';
      const createDTO: CreateCowDTO = {
        name: 'Bessie',
        race: 'HOLANDESA',
        birthDate: '2023-01-15',
      };

      const expectedCow: Cow = {
        id: 'cow-1',
        name: 'Bessie',
        race: 'HOLANDESA',
        birthDate: new Date('2023-01-15'),
        userId: 'user-1',
      };

      mockCowsRepository.create.mockResolvedValue(expectedCow);

      const result = await cowsService.create(createDTO, userId);

      expect(mockCowsRepository.create).toHaveBeenCalledWith({
        ...createDTO,
        userId,
      });
      expect(result).toEqual(expectedCow);
    });
  });

  describe('atualizar vaca', () => {
    it('deve atualizar uma vaca com sucesso', async () => {
      const cowId = 'cow-1';
      const updateDTO: UpdateCowDTO = {
        name: 'Bessie Updated',
        race: 'JERSEY',
      };

      const existingCow: Cow = {
        id: cowId,
        name: 'Bessie',
        race: 'HOLANDESA',
        birthDate: new Date('2023-01-15'),
        userId: 'user-1',
      };

      const updatedCow: Cow = {
        ...existingCow,
        name: 'Bessie Updated',
        race: 'JERSEY',
      };

      mockCowsRepository.findById.mockResolvedValue(existingCow);
      mockCowsRepository.updateById.mockResolvedValue(updatedCow);

      const result = await cowsService.update(cowId, updateDTO);

      expect(mockCowsRepository.findById).toHaveBeenCalledWith(cowId);
      expect(mockCowsRepository.updateById).toHaveBeenCalledWith(
        cowId,
        updateDTO
      );
      expect(result).toEqual(updatedCow);
    });

    it('deve lançar erro se vaca não for encontrada para atualização', async () => {
      const cowId = 'cow-1';
      const updateDTO: UpdateCowDTO = {
        name: 'Bessie Updated',
      };

      mockCowsRepository.findById.mockResolvedValue(null);

      await expect(cowsService.update(cowId, updateDTO)).rejects.toThrow(
        'Vaca não encontrada.'
      );

      expect(mockCowsRepository.findById).toHaveBeenCalledWith(cowId);
      expect(mockCowsRepository.updateById).not.toHaveBeenCalled();
    });
  });

  describe('buscar vaca', () => {
    it('deve retornar uma vaca por id', async () => {
      const cowId = 'cow-1';
      const expectedCow: Cow = {
        id: cowId,
        name: 'Bessie',
        race: 'HOLANDESA',
        birthDate: new Date('2023-01-15'),
        userId: 'user-1',
      };

      mockCowsRepository.findById.mockResolvedValue(expectedCow);

      const result = await cowsService.find(cowId);

      expect(mockCowsRepository.findById).toHaveBeenCalledWith(cowId);
      expect(result).toEqual(expectedCow);
    });

    it('deve lançar erro se vaca não for encontrada', async () => {
      const cowId = 'cow-1';

      mockCowsRepository.findById.mockResolvedValue(null);

      await expect(cowsService.find(cowId)).rejects.toThrow(
        'Vaca não encontrada.'
      );

      expect(mockCowsRepository.findById).toHaveBeenCalledWith(cowId);
    });
  });

  describe('buscar todas as vacas', () => {
    it('deve retornar todas as vacas', async () => {
      const expectedCows: Cow[] = [
        {
          id: 'cow-1',
          name: 'Bessie',
          race: 'HOLANDESA',
          birthDate: new Date('2023-01-15'),
          userId: 'user-1',
        },
        {
          id: 'cow-2',
          name: 'Molly',
          race: 'JERSEY',
          birthDate: new Date('2022-08-20'),
          userId: 'user-2',
        },
      ];

      mockCowsRepository.findAll.mockResolvedValue(expectedCows);

      const result = await cowsService.findAll();

      expect(mockCowsRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedCows);
    });
  });

  describe('buscar vacas por usuário', () => {
    it('deve retornar vacas por id do usuário', async () => {
      const userId = 'user-1';
      const expectedCows: Cow[] = [
        {
          id: 'cow-1',
          name: 'Bessie',
          race: 'HOLANDESA',
          birthDate: new Date('2023-01-15'),
          userId: 'user-1',
        },
      ];

      mockCowsRepository.findByUserId.mockResolvedValue(expectedCows);

      const result = await cowsService.findByUserId(userId);

      expect(mockCowsRepository.findByUserId).toHaveBeenCalledWith(userId);
      expect(result).toEqual(expectedCows);
    });
  });

  describe('deletar vaca', () => {
    it('deve deletar uma vaca com sucesso', async () => {
      const cowId = 'cow-1';

      const existingCow: Cow = {
        id: cowId,
        name: 'Bessie',
        race: 'HOLANDESA',
        birthDate: new Date('2023-01-15'),
        userId: 'user-1',
      };

      mockCowsRepository.findById.mockResolvedValue(existingCow);
      mockCowsRepository.deleteById.mockResolvedValue();

      await cowsService.delete(cowId);

      expect(mockCowsRepository.findById).toHaveBeenCalledWith(cowId);
      expect(mockCowsRepository.deleteById).toHaveBeenCalledWith(cowId);
    });

    it('deve lançar erro se vaca não for encontrada para exclusão', async () => {
      const cowId = 'cow-1';

      mockCowsRepository.findById.mockResolvedValue(null);

      await expect(cowsService.delete(cowId)).rejects.toThrow(
        'Vaca não encontrada.'
      );

      expect(mockCowsRepository.findById).toHaveBeenCalledWith(cowId);
      expect(mockCowsRepository.deleteById).not.toHaveBeenCalled();
    });
  });
});
