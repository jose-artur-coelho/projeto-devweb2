import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Erro capturado:', err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json({
          error: 'Registro já existe.',
          details: err.meta,
        });

      case 'P2025':
        return res.status(404).json({
          error: 'Registro não encontrado.',
          details: err.meta,
        });

      default:
        return res.status(400).json({
          error: 'Erro de banco de dados.',
          code: err.code,
        });
    }
  }

  return res.status(500).json({
    error: 'Erro interno do servidor.',
    message: err.message || 'Algo deu errado.',
  });
}
