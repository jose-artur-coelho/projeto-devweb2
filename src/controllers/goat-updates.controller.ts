import { Request, Response } from 'express';
import { GoatUpdatesService } from '../services/goat-updates.service';
import { PrismaGoatUpdatesRepository } from '../db/repository/goat-updates/prisma-goat-updates.repository';

export class GoatUpdatesController {
  constructor(private readonly goatUpdatesService: GoatUpdatesService) {
    this.goatUpdatesService = goatUpdatesService;
  }

  create = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const update = await this.goatUpdatesService.create(data, userId);
      return res.status(201).json(update);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieve = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const update = await this.goatUpdatesService.find(id);
      return res.status(200).json(update);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieveAll = async (_: Request, res: Response) => {
    try {
      const updates = await this.goatUpdatesService.findAll();
      return res.status(200).json(updates);
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

      const updates = await this.goatUpdatesService.findByUserId(userId);
      return res.status(200).json(updates);
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
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const updatedUpdate = await this.goatUpdatesService.update(
        id,
        newData,
        userId
      );
      return res.status(200).json(updatedUpdate);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      await this.goatUpdatesService.delete(id, userId);
      return res.status(204).send();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };
}

export const goatUpdatesController = new GoatUpdatesController(
  new GoatUpdatesService(new PrismaGoatUpdatesRepository())
);
