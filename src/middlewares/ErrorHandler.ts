import { Request, Response, NextFunction } from 'express';
import AppError from './ErrorClasses';
import { Logger } from '../utils/logger';
import { ZodError } from 'zod';
import { TokenExpiredError } from 'jsonwebtoken';

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  Logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.statusCode,
    });
  }

  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ error: err.issues.map((e) => e.message), code: 400 });
  }

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      error: 'Token expired!',
      code: 401,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json(err);
  }

  return res.status(500).json({ error: 'Something went wrong!' });
};
