import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger';

/**
 * Wraps an async Express route handler to properly handle errors.
 * Express does not automatically catch errors in async functions.
 * So we have to manually pass the errors to express to handle.
 * @param fn The async route handler to wrap.
 * @returns Express middleware function.
 */
export default <Params = {}, ResBody = any, ReqBody = any, ReqQuery = any, T = any>(
    fn: (
      req: Request<Params, ResBody, ReqBody, ReqQuery>,
      res: Response,
      next: NextFunction
    ) => Promise<T>
  ) =>
  async (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await fn(req, res, next);
      return result;
    } catch (error) {
      Logger.error('AsyncWrapper Error: ', error);
      next(error); // manually pass the errors to express
    }
  };
