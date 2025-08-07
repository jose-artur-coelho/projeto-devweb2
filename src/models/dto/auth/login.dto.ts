import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ error: 'O campo email precisa ser um email válido.' }),

  password: z
    .string({ error: 'O campo password é obrigatório' })
    .min(3, { error: 'O campo password não pode ter menos de 8 caracteres.' }),
});

export type LoginDTO = z.infer<typeof loginSchema>;
