import { z } from 'zod';

export const createCowUpdateSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Data deve ser uma data válida',
  }),
  sick: z.boolean(),
  milkQuantity: z
    .number()
    .min(0, 'Quantidade de leite deve ser maior ou igual a 0'),
  cowId: z.string().min(1, 'ID da vaca é obrigatório'),
});

export type CreateCowUpdateDTO = z.infer<typeof createCowUpdateSchema>;
