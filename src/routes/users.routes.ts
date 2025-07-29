import express, { Request, Response } from 'express';
import { UsersService } from '../service/users.service';
import { PrismaUsersRepository } from '../db/repository/users/prisma-users.repository';
import { validateData } from '../middlewares/validate-data';
import { createUserSchema } from '../types/dto/create-user.dto';

const usersRoutes = express.Router();

const usersService = new UsersService(new PrismaUsersRepository());

usersRoutes.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await usersService.getUser(id);
  res.status(200).json(user);
});

usersRoutes.post(
  '/',
  validateData(createUserSchema),
  async (req: Request, res: Response) => {
    const newUser = req.body;
    console.log(newUser);
    const user = await usersService.createUser(newUser);
    res.status(201).json(user);
  }
);

usersRoutes.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const newData = req.body;
  const updatedUser = await usersService.updateUser(id, newData);
  res.status(200).json(updatedUser);
});

usersRoutes.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  usersService.deleteUser(id);
  res.send(204).json();
});

export default usersRoutes;
