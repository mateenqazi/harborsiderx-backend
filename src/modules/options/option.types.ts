import { z } from 'zod';

export const OptionSchema = z.object({
  id: z.number(),
  description: z.string(),
  question_id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type OptionType = z.infer<typeof OptionSchema>;
