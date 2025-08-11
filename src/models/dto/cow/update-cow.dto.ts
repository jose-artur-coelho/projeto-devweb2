import { z } from 'zod';

export const updateCowSchema = z.object({
  name: z.string().min(1, 'Nome deve possuir mais de uma letra.').optional(),
  race: z.enum(['HOLANDESA', 'JERSEY', 'GIR', 'GIROLANDO']).optional(),
  birthDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Data de nascimento deve ser uma data válida',
    })
    .optional(),
});

export type UpdateCowDTO = z.infer<typeof updateCowSchema>;
