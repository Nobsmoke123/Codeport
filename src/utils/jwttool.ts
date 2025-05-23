import jwt from 'jsonwebtoken';
import { Logger } from './logger';

export type JwtDecodedData = {
  fullname: string;
  userId: string;
  role: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
};

export class JWT {
  static get secret() {
    return process.env.JWT_SECRET || '';
  }

  static sign(data: { [key: string]: string }): string {
    if (JWT.secret === '') {
      throw new Error('No JWT Secret found!');
    }

    return jwt.sign(data, JWT.secret, {
      audience: 'practice',
      issuer: 'doald-blog',
      subject: 'accessToken',
      expiresIn: '1hr',
    });
  }

  static verify(token: string): JwtDecodedData {
    try {
      const decoded = jwt.verify(token, JWT.secret) as JwtDecodedData;
      return decoded;
    } catch (error) {
      Logger.error('JWT Verify Error: ', error);
      throw error;
    }
  }
}
