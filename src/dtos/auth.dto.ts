import { IUser } from '../models';

export type RegisterDtoData = Pick<
  IUser,
  'email' | 'fullname' | 'password' | 'username'
>;

export type LogInDtoData = Pick<IUser, 'email' | 'password'>;
