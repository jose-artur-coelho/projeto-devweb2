import express from 'express';
import { validateData } from '../middlewares/validate-data.middleware';
import { loginSchema } from '../models/dto/auth/login.dto';
import { authController } from '../controllers/auth.controller';

const authRoutes = express.Router();

authRoutes.post('/login', validateData(loginSchema), authController.login);

export default authRoutes;
