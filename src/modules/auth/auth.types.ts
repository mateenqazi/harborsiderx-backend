import { z } from 'zod';

export const ResetPassword = z.object({
  password: z.string(),
  confirmationCode: z.string(),
  email: z.string(),
}).strict();

export type ResetPasswordType = z.infer<typeof ResetPassword>;