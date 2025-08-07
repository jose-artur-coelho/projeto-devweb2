import express from 'express';
import { validateData } from '../middlewares/validate-data.middleware';
import { createUserSchema } from '../models/dto/user/create-user.dto';
import { updateUserSchema } from '../models/dto/user/update-user.dto';
import { authenticate } from '../middlewares/authenticate.middleware';
import { usersController } from '../controllers/users.controller';
import { authorize } from '../middlewares/authorize.middleware';

const usersRoutes = express.Router();

usersRoutes.get('/:id', authenticate, usersController.retrieve);

usersRoutes.get('/', authenticate, authorize, usersController.retrieveAll);

usersRoutes.post('/', validateData(createUserSchema), usersController.create);

usersRoutes.put(
  '/',
  validateData(updateUserSchema),
  authenticate,
  usersController.update
);

usersRoutes.delete('/', authenticate, usersController.delete);

export default usersRoutes;
