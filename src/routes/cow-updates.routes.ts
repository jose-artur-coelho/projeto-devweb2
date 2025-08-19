import express from 'express';
import { validateData } from '../middlewares/validate-data.middleware';
import { createCowUpdateSchema } from '../models/dto/cow-update/create-cow-update.dto';
import { updateCowUpdateSchema } from '../models/dto/cow-update/update-cow-update.dto';
import { authenticate } from '../middlewares/authenticate.middleware';
import { cowUpdatesController } from '../controllers/cow-updates.controller';
import { authorize } from '../middlewares/authorize.middleware';

const cowUpdatesRoutes = express.Router();

cowUpdatesRoutes.get(
  '/user/me',
  authenticate,
  cowUpdatesController.retrieveByUser
);
cowUpdatesRoutes.get('/:id', authenticate, cowUpdatesController.retrieve);
cowUpdatesRoutes.get(
  '/',
  authenticate,
  authorize,
  cowUpdatesController.retrieveAll
);
cowUpdatesRoutes.post(
  '/',
  validateData(createCowUpdateSchema),
  authenticate,
  cowUpdatesController.create
);
cowUpdatesRoutes.put(
  '/:id',
  validateData(updateCowUpdateSchema),
  authenticate,
  cowUpdatesController.update
);
cowUpdatesRoutes.delete('/:id', authenticate, cowUpdatesController.delete);

export default cowUpdatesRoutes;
