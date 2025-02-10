import { Request, Response, NextFunction } from 'express';
// import { UnauthorizedError } from './ErrorClasses';
// import mongoose from 'mongoose';

/**
 * Middleware to authorize the user.
 * @param req The request object.
 * @param _res The response object.
 * @param next The next function.
 */
export const authorize = (req: Request, _res: Response, next: NextFunction) => {
  console.log('The headers are: ');
  console.log(req.headers);

  // if (!Authorization) {
  //   throw new UnauthorizedError('Unauthorized');
  // }

  // const token = Authorization.split(' ')[1];

  // if (!token) {
  //   throw new UnauthorizedError('Unauthorized');
  // }

  // const { user } = req;

  // if (!user) {
  //   throw new UnauthorizedError('Unauthorized');
  // }

  // if (!mongoose.Types.ObjectId.isValid(user)) {
  //   throw new UnauthorizedError('Unauthorized');
  // }

  next();
};
