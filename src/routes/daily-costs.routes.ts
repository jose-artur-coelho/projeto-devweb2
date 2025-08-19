import express from 'express';
import { validateData } from '../middlewares/validate-data.middleware';
import { createDailyCostsSchema } from '../models/dto/daily-costs/create-daily-costs.dto';
import { updateDailyCostsSchema } from '../models/dto/daily-costs/update-daily-costs.dto';
import { authenticate } from '../middlewares/authenticate.middleware';
import { dailyCostsController } from '../controllers/daily-costs.controller';
import { authorize } from '../middlewares/authorize.middleware';

const dailyCostsRoutes = express.Router();

dailyCostsRoutes.get(
  '/user/me',
  authenticate,
  dailyCostsController.retrieveByUser
);
dailyCostsRoutes.get('/:id', authenticate, dailyCostsController.retrieve);
dailyCostsRoutes.get(
  '/',
  authenticate,
  authorize,
  dailyCostsController.retrieveAll
);
dailyCostsRoutes.post(
  '/',
  validateData(createDailyCostsSchema),
  authenticate,
  dailyCostsController.create
);
dailyCostsRoutes.put(
  '/:id',
  validateData(updateDailyCostsSchema),
  authenticate,
  dailyCostsController.update
);
dailyCostsRoutes.delete('/:id', authenticate, dailyCostsController.delete);

export default dailyCostsRoutes;
