import { z } from 'zod';

export const updateGoatUpdateSchema = z.object({
  sick: z.boolean().optional(),
  milkQuantity: z
    .number()
    .min(0, 'Quantidade de leite deve ser maior ou igual a 0')
    .optional(),
});

export type UpdateGoatUpdateDTO = z.infer<typeof updateGoatUpdateSchema>;
