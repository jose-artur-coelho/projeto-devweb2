import { z } from 'zod';

export const updateGoatSchema = z.object({
  name: z.string().min(1, 'Nome deve possuir mais de uma letra.').optional(),
  race: z.enum(['BOER', 'SAANEN', 'ALPINA', 'ANGLO']).optional(),
  birthDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Data de nascimento deve ser uma data válida',
    })
    .optional(),
});

export type UpdateGoatDTO = z.infer<typeof updateGoatSchema>;
