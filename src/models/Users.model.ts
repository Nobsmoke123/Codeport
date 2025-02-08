import { Schema, model } from 'mongoose';

export enum SocialProvider {
  Google = 'google',
  Twitter = 'twitter',
  Facebook = 'facebook',
  None = 'none',
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export interface IUser {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  password?: string;
  socialProvider: SocialProvider;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    // id: Schema.Types.ObjectId,
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    socialProvider: { type: String },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);

export const User = model('User', userSchema);
