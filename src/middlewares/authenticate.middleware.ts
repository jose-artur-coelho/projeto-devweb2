import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/auth';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acesso negado. Nenhum token foi enviado.' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token inválido.' });
  }
}
