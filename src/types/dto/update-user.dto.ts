import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, { error: 'O campo name não pode ter menos de 3 caracteres.' }),

  email: z
    .email({ error: 'O campo email precisa ser um email válido.' })
    .optional(),

  password: z
    .string()
    .min(8, { error: 'O campo password não pode ter menos de 8 caracteres.' })
    .optional(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
