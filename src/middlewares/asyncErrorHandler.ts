import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';

/**
 * Express does not automatically catch errors in async functions.
 * So we have to manually pass the errors to express to handle.
 * @param fn
 * @returns Promise<T>
 */
export const AsyncWrapper =
  <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      Logger.error('AsyncWrapper Error: ', error);
      next(error); // manually pass the errors to express
    }
  };
