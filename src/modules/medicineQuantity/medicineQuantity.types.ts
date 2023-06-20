import { z } from 'zod';

export const MedicineQuantitySchema = z.object({
  id: z.number(),
  qty: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});


export type MedicineQuantityType = z.infer<typeof MedicineQuantitySchema>;