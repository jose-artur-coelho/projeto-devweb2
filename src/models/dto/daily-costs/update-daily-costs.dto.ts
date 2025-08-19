import { z } from 'zod';

export const updateDailyCostsSchema = z.object({
  laborCosts: z
    .number()
    .min(0, 'Custos de mão de obra devem ser maior ou igual a 0')
    .optional(),
  feedCosts: z
    .number()
    .min(0, 'Custos de alimentação devem ser maior ou igual a 0')
    .optional(),
});

export type UpdateDailyCostsDTO = z.infer<typeof updateDailyCostsSchema>;
