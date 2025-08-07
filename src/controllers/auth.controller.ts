import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { PrismaUsersRepository } from '../db/repository/users/prisma-users.repository';

export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const token = await this.authService.login(data);
      return res.status(200).json({ token });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      return res.status(400).json({ error: errorMessage });
    }
  };
}

export const authController = new AuthController(
  new AuthService(new PrismaUsersRepository())
);
