import { z } from 'zod';

export const RowTimeStampsSchema = {
  isDeleted: z.boolean().optional(),
  createdAt: z.union([z.date(), z.string()]).optional(),
  updatedAt: z.union([z.date(), z.string()]).optional(),
};
