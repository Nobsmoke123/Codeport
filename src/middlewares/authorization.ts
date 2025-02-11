import { Request, Response, NextFunction } from 'express';
import { BadRequestError, UnauthorizedError } from './ErrorClasses';
import { JWT } from '../utils/jwttool';
// import { UnauthorizedError } from './ErrorClasses';
// import mongoose from 'mongoose';

/**
 * Middleware to authorize the user.
 * @param req The request object.
 * @param _res The response object.
 * @param next The next function.
 */
export const authorize = <T>(
  req: Request<{}, T, T, T, {}>,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('You are unauthorized! Please log in.');
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('You are unauthorized! Please log in.');
  }

  const decoded = JWT.verify(token);

  if (!decoded) {
    throw new BadRequestError('Bad Request!');
  }

  req.user = decoded.userId;

  // if (!user) {
  //   throw new UnauthorizedError('Unauthorized');
  // }

  // if (!mongoose.Types.ObjectId.isValid(user)) {
  //   throw new UnauthorizedError('Unauthorized');
  // }

  next();
};
