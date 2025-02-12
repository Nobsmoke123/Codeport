import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from './ErrorClasses';

export default async (req: Request, _res: Response, next: NextFunction) => {
  const err = new NotFoundError(`Route ${req.url} does not exist.`);
  next(err);
};
