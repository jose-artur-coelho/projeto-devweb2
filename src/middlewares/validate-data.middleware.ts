import { NextFunction, Request, Response } from 'express';
import z, { ZodType } from 'zod';

export function validateData(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validatedData = schema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json(z.treeifyError(validatedData.error));
    }

    req.body = validatedData.data;
    next();
  };
}
