import { z } from 'zod';

export const MedicineSchema = z.object({
  id: z.number(),
  image_name: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.string(),
  doctors_fee: z.number(),
  pharmacyFee: z.number(),
  shippingCost: z.number(),
  fdaApprovedMedication: z.boolean(),
  averageTreatmentCost: z.string(),
  averageTimeRequired: z.string(),
  mgId: z.number(),
  qtyId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});


export type MedicineType = z.infer<typeof MedicineSchema>;