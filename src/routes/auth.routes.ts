import express, { Request, Response } from 'express';
import { UsersService } from '../service/users.service';
import { PrismaUsersRepository } from '../db/repository/users/prisma-users.repository';

const usersRoutes = express.Router();
const usersService = new UsersService(new PrismaUsersRepository());
