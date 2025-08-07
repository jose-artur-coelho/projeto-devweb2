import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { PrismaUsersRepository } from '../db/repository/users/prisma-users.repository';

export class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  create = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await this.usersService.create(data);
    return res.status(201).json(user);
  };

  retrieve = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = await this.usersService.find(id);
      return res.status(200).json(user);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  retrieveAll = async (_: Request, res: Response) => {
    const users = await this.usersService.findAll();
    return res.status(200).json(users);
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = req.user?.id;
      const newData = req.body;
      if (id) {
        const updatedUser = await this.usersService.update(id, newData);
        return res.status(200).json(updatedUser);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.user?.id;
      if (id) {
        await this.usersService.delete(id);
        return res.status(204).send();
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };
}

export const usersController = new UsersController(
  new UsersService(new PrismaUsersRepository())
);
