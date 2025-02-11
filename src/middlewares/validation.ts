import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * Validate schema
 * @param schema ZodSchema
 * @returns void
 */
const validatateSchema =
  (schema: ZodSchema) =>
  <T>(req: Request<{}, T, T, T, {}>, _res: Response, next: NextFunction) => {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    next();
  };

export default validatateSchema;
