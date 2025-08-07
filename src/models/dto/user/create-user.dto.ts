import { string, z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string({ error: 'O campo name é obrigatório' })
    .min(3, { error: 'O campo name não pode ter menos de 3 caracteres.' }),

  email: z.email({ error: 'O campo email precisa ser um email válido.' }),

  password: z
    .string({ error: 'O campo password é obrigatório' })
    .min(3, { error: 'O campo password não pode ter menos de 8 caracteres.' }),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
