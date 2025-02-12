import mongoose from 'mongoose';
import { z } from 'zod';

const commentPayload = {
  body: z.object({
    parentId: z
      .string({
        message: 'ParentId should be a string.',
      })
      .transform((val, ctx) => {
        if (!mongoose.Types.ObjectId.isValid(val)) {
          ctx.addIssue({
            message: 'parentId should be a valid ID.',
            code: z.ZodIssueCode.custom,
          });
          return z.NEVER;
        }

        return val;
      })
      .nullable(),
    content: z
      .string({
        message: 'Content is required.',
      })
      .min(3)
      .max(50),
  }),
};

const updateCommentPayload = {
  body: z.object({
    content: z
      .string({
        message: 'Content is required.',
      })
      .min(3)
      .max(50),
  }),
};

const commentParams = {
  params: z.object({
    postId: z.string().transform((val, ctx) => {
      if (!mongoose.Types.ObjectId.isValid(val)) {
        ctx.addIssue({
          message: 'parentId should be a valid ID.',
          code: z.ZodIssueCode.custom,
        });
        return z.NEVER;
      }

      return val;
    }),
    commentId: z.string().transform((val, ctx) => {
      if (!mongoose.Types.ObjectId.isValid(val)) {
        ctx.addIssue({
          message: 'parentId should be a valid ID.',
          code: z.ZodIssueCode.custom,
        });
        return z.NEVER;
      }

      return val;
    }),
  }),
};

const listCommentParams = {
  params: z.object({
    postId: z.string().transform((val, ctx) => {
      if (!mongoose.Types.ObjectId.isValid(val)) {
        ctx.addIssue({
          message: 'parentId should be a valid ID.',
          code: z.ZodIssueCode.custom,
        });

        return z.NEVER;
      }

      return val;
    }),
  }),
};

export const createCommentSchema = z.object({
  ...commentPayload,
  ...listCommentParams,
});

export const getCommentSchema = z.object({
  ...commentParams,
});

export const updateCommentSchema = z.object({
  ...commentParams,
  ...updateCommentPayload,
});

export const listCommentSchema = z.object({
  ...listCommentParams,
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type GetCommentInput = z.infer<typeof getCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type ListCommentInput = z.infer<typeof listCommentSchema>;
