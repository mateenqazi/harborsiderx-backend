import { z } from 'zod';

export const AnswerSchema = z.object({
  id: z.number(),
  answer: z.string(),
  option_id: z.number(),
  user_id: z.number(),
  question_id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AnswerType = z.infer<typeof AnswerSchema>;
