import jwt from 'jsonwebtoken';
import { Logger } from './logger';

export class JWT {
  private static secret = process.env.JWT_SECRET || '';

  static sign(data: { [key: string]: string }) {
    if (JWT.secret === '') {
      throw new Error('No JWT Secret found!');
    }

    return jwt.sign(data, JWT.secret, {
      expiresIn: '1hr',
    });
  }

  static verify(token: string) {
    try {
      const decoded = jwt.verify(token, JWT.secret) as {
        [key: string]: string;
      };
      return decoded;
    } catch (error) {
      Logger.error('JWT Verify Error: ', error);
      throw error;
    }
  }
}
