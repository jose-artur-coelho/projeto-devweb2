import express from 'express';
import { validateData } from '../middlewares/validate-data.middleware';
import { createCowSchema } from '../models/dto/cow/create-cow.dto';
import { updateCowSchema } from '../models/dto/cow/update-cow.dto';
import { authenticate } from '../middlewares/authenticate.middleware';
import { cowsController } from '../controllers/cows.controller';
import { authorize } from '../middlewares/authorize.middleware';

const cowsRoutes = express.Router();

// Buscar vacas do usuário logado (deve vir antes da rota /:id)
cowsRoutes.get('/user/me', authenticate, cowsController.retrieveByUser);

// Buscar vaca por ID
cowsRoutes.get('/:id', authenticate, cowsController.retrieve);

// Buscar todas as vacas (apenas ADMIN)
cowsRoutes.get('/', authenticate, authorize, cowsController.retrieveAll);

// Criar nova vaca
cowsRoutes.post(
  '/',
  validateData(createCowSchema),
  authenticate,
  cowsController.create
);

// Atualizar vaca
cowsRoutes.put(
  '/:id',
  validateData(updateCowSchema),
  authenticate,
  cowsController.update
);

// Deletar vaca
cowsRoutes.delete('/:id', authenticate, cowsController.delete);

export default cowsRoutes;
