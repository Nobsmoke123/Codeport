import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        message: 'Email / username is required.',
      })
      .email(),
    password: z.string({
      message: 'Password is required.',
    }),
  }),
});

export const registrationSchema = z.object({
  body: z.object({
    email: z
      .string({
        message: 'Email is required.',
      })
      .email(),
    password: z.string({
      message: 'Password is required.',
    }),
    fullname: z
      .string({
        message: 'Fullname is required.',
      })
      .max(25)
      .min(7),
    username: z
      .string({
        message: 'Username is required.',
      })
      .min(3)
      .max(10),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registrationSchema>;
