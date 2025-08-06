import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  async createUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = await this.usersService.createUser(data);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(403).json({ error: err });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const newData = req.body;
      const updatedUser = await this.usersService.updateUser(id, newData);
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(403).json(err);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const newData = req.body;
      this.usersService.updateUser(id, newData);
      return res.status(204);
    } catch (err) {
      return res.status(403).json({ error: err });
    }
  }
}
