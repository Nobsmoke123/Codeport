import { Request, Response, NextFunction } from 'express';
import AppError from './ErrorClasses';
import { Logger } from '../utils/logger';

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

  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json(err);
  }

  return res.status(500).json({ error: 'Something went wrong!' });
};
