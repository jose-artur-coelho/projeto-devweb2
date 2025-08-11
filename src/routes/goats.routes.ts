import express from 'express';
import { validateData } from '../middlewares/validate-data.middleware';
import { createGoatSchema } from '../models/dto/goat/create-goat.dto';
import { updateGoatSchema } from '../models/dto/goat/update-goat.dto';
import { authenticate } from '../middlewares/authenticate.middleware';
import { goatsController } from '../controllers/goats.controller';
import { authorize } from '../middlewares/authorize.middleware';

const goatsRoutes = express.Router();

// Buscar cabras do usuário logado (deve vir antes da rota /:id)
goatsRoutes.get('/user/me', authenticate, goatsController.retrieveByUser);

// Buscar cabra por ID
goatsRoutes.get('/:id', authenticate, goatsController.retrieve);

// Buscar todas as cabras (apenas ADMIN)
goatsRoutes.get('/', authenticate, authorize, goatsController.retrieveAll);

// Criar nova cabra
goatsRoutes.post(
  '/',
  validateData(createGoatSchema),
  authenticate,
  goatsController.create
);

// Atualizar cabra
goatsRoutes.put(
  '/:id',
  validateData(updateGoatSchema),
  authenticate,
  goatsController.update
);

// Deletar cabra
goatsRoutes.delete('/:id', authenticate, goatsController.delete);

export default goatsRoutes;
