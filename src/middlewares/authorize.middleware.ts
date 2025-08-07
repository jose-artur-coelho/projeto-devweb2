import { NextFunction, Request, Response } from 'express';

export function authorize(req: Request, res: Response, next: NextFunction) {
  const role = req.user?.role;
  if (role !== 'ADMIN') {
    return res
      .status(403)
      .json({ error: 'Você não possui permissão para realizar essa ação.' });
  }
  next();
}
