import { Request, Response, NextFunction } from 'express';

export const Error404Handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = new Error('404 Not Found.');
  next(err);
};
