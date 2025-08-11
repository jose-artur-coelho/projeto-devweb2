import { z } from 'zod';

export const createCowSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  race: z.enum(['HOLANDESA', 'JERSEY', 'GIR', 'GIROLANDO']),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Data de nascimento deve ser uma data válida',
  }),
});

export type CreateCowDTO = z.infer<typeof createCowSchema>;
