import express from 'express';
import { UsersService } from '../service/users.service';
import { PrismaUsersRepository } from '../db/repository/users/prisma-users.repository';

const usersRoutes = express.Router();

const usersService = new UsersService(new PrismaUsersRepository());

usersRoutes.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await usersService.getUser(id);
  res.status(200).json(user);
});

usersRoutes.post('/', async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  const user = await usersService.createUser(newUser);
  res.status(201).json(user);
});

usersRoutes.put('/:id', async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const updatedUser = await usersService.updateUser(id, newData);
  res.status(200).json(updatedUser);
});

usersRoutes.delete('/:id', (req, res) => {
  const id = req.params.id;
  usersService.deleteUser(id);
  res.send(204).json();
});

export default usersRoutes;
