import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string(),
  type: z.enum(['local', 'google']),
  createdAt: z.string(),
  updatedAt: z.string(),
});


export type UserType = z.infer<typeof UserSchema>;

export const userSignUpSchema = z.object({
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  email: z.string().nonempty('Email field is required').email(),
});

export const userSignInSchema = z.object({
  email: z.string().nonempty('email field is required').email(),
  password: z.string(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().nonempty('Email field is required').email(),
}).strict()
