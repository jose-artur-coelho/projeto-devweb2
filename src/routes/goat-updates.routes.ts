import express from 'express';
import { validateData } from '../middlewares/validate-data.middleware';
import { createGoatUpdateSchema } from '../models/dto/goat-update/create-goat-update.dto';
import { updateGoatUpdateSchema } from '../models/dto/goat-update/update-goat-update.dto';
import { authenticate } from '../middlewares/authenticate.middleware';
import { goatUpdatesController } from '../controllers/goat-updates.controller';
import { authorize } from '../middlewares/authorize.middleware';

const goatUpdatesRoutes = express.Router();

goatUpdatesRoutes.get(
  '/user/me',
  authenticate,
  goatUpdatesController.retrieveByUser
);
goatUpdatesRoutes.get('/:id', authenticate, goatUpdatesController.retrieve);
goatUpdatesRoutes.get(
  '/',
  authenticate,
  authorize,
  goatUpdatesController.retrieveAll
);
goatUpdatesRoutes.post(
  '/',
  validateData(createGoatUpdateSchema),
  authenticate,
  goatUpdatesController.create
);
goatUpdatesRoutes.put(
  '/:id',
  validateData(updateGoatUpdateSchema),
  authenticate,
  goatUpdatesController.update
);
goatUpdatesRoutes.delete('/:id', authenticate, goatUpdatesController.delete);

export default goatUpdatesRoutes;
