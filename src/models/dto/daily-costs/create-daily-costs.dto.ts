import { z } from 'zod';

export const createDailyCostsSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Data deve ser uma data válida',
  }),
  laborCosts: z
    .number()
    .min(0, 'Custos de mão de obra devem ser maior ou igual a 0'),
  feedCosts: z
    .number()
    .min(0, 'Custos de alimentação devem ser maior ou igual a 0'),
});

export type CreateDailyCostsDTO = z.infer<typeof createDailyCostsSchema>;
