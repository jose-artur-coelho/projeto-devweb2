import { z } from 'zod';

export const updateCowUpdateSchema = z.object({
  sick: z.boolean().optional(),
  milkQuantity: z
    .number()
    .min(0, 'Quantidade de leite deve ser maior ou igual a 0')
    .optional(),
});

export type UpdateCowUpdateDTO = z.infer<typeof updateCowUpdateSchema>;
