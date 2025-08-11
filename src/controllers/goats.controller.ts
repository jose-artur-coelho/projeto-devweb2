import { Request, Response } from 'express';
import { GoatsService } from '../services/goats.service';
import { PrismaGoatsRepository } from '../db/repository/goats/prisma-goats.repository';

export class GoatsController {
  constructor(private readonly goatsService: GoatsService) {
    this.goatsService = goatsService;
  }

  create = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const goat = await this.goatsService.create(data, userId);
      return res.status(201).json(goat);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieve = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const goat = await this.goatsService.find(id);
      return res.status(200).json(goat);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieveAll = async (_: Request, res: Response) => {
    try {
      const goats = await this.goatsService.findAll();
      return res.status(200).json(goats);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieveByUser = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const goats = await this.goatsService.findByUserId(userId);
      return res.status(200).json(goats);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const newData = req.body;

      const updatedGoat = await this.goatsService.update(id, newData);
      return res.status(200).json(updatedGoat);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await this.goatsService.delete(id);
      return res.status(204).send();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };
}

export const goatsController = new GoatsController(
  new GoatsService(new PrismaGoatsRepository())
);
