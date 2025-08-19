import { Request, Response } from 'express';
import { CowUpdatesService } from '../services/cow-updates.service';
import { PrismaCowUpdatesRepository } from '../db/repository/cow-updates/prisma-cow-updates.repository';

export class CowUpdatesController {
  constructor(private readonly cowUpdatesService: CowUpdatesService) {
    this.cowUpdatesService = cowUpdatesService;
  }

  create = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const update = await this.cowUpdatesService.create(data, userId);
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
      const update = await this.cowUpdatesService.find(id);
      return res.status(200).json(update);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieveAll = async (_: Request, res: Response) => {
    try {
      const updates = await this.cowUpdatesService.findAll();
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

      const updates = await this.cowUpdatesService.findByUserId(userId);
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

      const updatedUpdate = await this.cowUpdatesService.update(
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

      await this.cowUpdatesService.delete(id, userId);
      return res.status(204).send();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };
}

export const cowUpdatesController = new CowUpdatesController(
  new CowUpdatesService(new PrismaCowUpdatesRepository())
);
