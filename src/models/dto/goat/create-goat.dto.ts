import { z } from 'zod';

export const createGoatSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  race: z.enum(['BOER', 'SAANEN', 'ALPINA', 'ANGLO']),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Data de nascimento deve ser uma data válida',
  }),
});

export type CreateGoatDTO = z.infer<typeof createGoatSchema>;
