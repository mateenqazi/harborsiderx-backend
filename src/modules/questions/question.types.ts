import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.number(),
  description: z.string(),
  type: z.enum(['radio', 'text']),
  step: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type QuestionType = z.infer<typeof QuestionSchema>;
