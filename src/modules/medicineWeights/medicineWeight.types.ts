import { z } from 'zod';

export const MedicineWeightSchema = z.object({
  id: z.number(),
  weight: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});


export type MedicineWeightType = z.infer<typeof MedicineWeightSchema>;