import mongoose from 'mongoose';
import { z } from 'zod';

const postPayload = {
  body: z.object({
    title: z.string({
      message: 'Title is required.',
    }),
    featuredImage: z
      .string({
        message: 'Featured image is required.',
      })
      .url(),
    content: z
      .string({
        message: 'Content is required.',
      })
      .min(50)
      .max(500),
  }),
};

const postParams = {
  params: z.object({
    id: z
      .string({
        message: 'ID should be a string',
      })
      .transform((val, ctx) => {
        if (!mongoose.Types.ObjectId.isValid(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'ID is invalid.',
          });
          return z.NEVER;
        }
        return new mongoose.Types.ObjectId(val);
      }),
  }),
};

export const createPostSchema = z.object({
  ...postPayload,
});

export const updatePostSchema = z.object({
  ...postPayload,
  ...postParams,
});

export const getPostSchema = z.object({
  ...postParams,
});
