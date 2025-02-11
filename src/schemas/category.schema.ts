import mongoose from 'mongoose';
import { z } from 'zod';

const categoryPayload = {
  body: z.object({
    name: z.string({
      message: 'Name is required.',
    }),
    image: z
      .string({
        message: 'Image URL is required.',
      })
      .url(),
  }),
};

const categoryParams = {
  params: z.object({
    id: z.string().transform((val, ctx) => {
      if (!mongoose.Types.ObjectId.isValid(val)) {
        ctx.addIssue({
          message: 'ID must be a valid ID.',
          code: z.ZodIssueCode.custom,
        });

        return z.NEVER;
      }

      return val;
    }),
  }),
};

export const createCategorySchema = z.object({
  ...categoryPayload,
});

export const getCategorySchema = z.object({
  ...categoryParams,
});

export const updateCategorySchema = z.object({
  ...categoryParams,
  ...categoryPayload,
});

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type GetCategoryInput = z.infer<typeof getCategorySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
