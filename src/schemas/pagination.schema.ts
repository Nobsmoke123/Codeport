// import mongoose from 'mongoose';
import { z } from 'zod';

export const paginationSchema = z.object({
  query: z.object({
    limit: z.coerce
      .number({
        message: 'Limit must be a number.',
      })
      .nullable()
      .default(10),
    cursor: z
      .string({
        message: 'Cursor should be a string',
      })
      // .transform((val, ctx) => {
      //   if (!mongoose.Types.ObjectId.isValid(val)) {
      //     ctx.addIssue({
      //       code: z.ZodIssueCode.custom,
      //       message: 'Cursor is invalid.',
      //     });
      //     return z.NEVER;
      //   }
      //   return new mongoose.Types.ObjectId(val);
      // })
      .nullable(),
  }),
});

export type PaginationQueryInput = z.infer<typeof paginationSchema>;
