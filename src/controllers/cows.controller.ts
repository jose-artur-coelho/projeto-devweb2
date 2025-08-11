import { Request, Response } from 'express';
import { CowsService } from '../services/cows.service';
import { PrismaCowsRepository } from '../db/repository/cows/prisma-cows.repository';

export class CowsController {
  constructor(private readonly cowsService: CowsService) {
    this.cowsService = cowsService;
  }

  create = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const cow = await this.cowsService.create(data, userId);
      return res.status(201).json(cow);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieve = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const cow = await this.cowsService.find(id);
      return res.status(200).json(cow);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieveAll = async (_: Request, res: Response) => {
    try {
      const cows = await this.cowsService.findAll();
      return res.status(200).json(cows);
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

      const cows = await this.cowsService.findByUserId(userId);
      return res.status(200).json(cows);
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

      const updatedCow = await this.cowsService.update(id, newData);
      return res.status(200).json(updatedCow);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await this.cowsService.delete(id);
      return res.status(204).send();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };
}

export const cowsController = new CowsController(
  new CowsService(new PrismaCowsRepository())
);
