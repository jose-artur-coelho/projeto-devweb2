import { Request, Response } from 'express';
import { DailyCostsService } from '../services/daily-costs.service';
import { PrismaDailyCostsRepository } from '../db/repository/daily-costs/prisma-daily-costs.repository';

export class DailyCostsController {
  constructor(private readonly dailyCostsService: DailyCostsService) {
    this.dailyCostsService = dailyCostsService;
  }

  create = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const costs = await this.dailyCostsService.create(data, userId);
      return res.status(201).json(costs);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieve = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const costs = await this.dailyCostsService.find(id);
      return res.status(200).json(costs);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieveAll = async (_: Request, res: Response) => {
    try {
      const costs = await this.dailyCostsService.findAll();
      return res.status(200).json(costs);
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

      const costs = await this.dailyCostsService.findByUserId(userId);
      return res.status(200).json(costs);
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

      const updatedCosts = await this.dailyCostsService.update(
        id,
        newData,
        userId
      );
      return res.status(200).json(updatedCosts);
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

      await this.dailyCostsService.delete(id, userId);
      return res.status(204).send();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };
}

export const dailyCostsController = new DailyCostsController(
  new DailyCostsService(new PrismaDailyCostsRepository())
);
