import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

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
  comparePasswords(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    // id: Schema.Types.ObjectId,
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    socialProvider: { type: String, enum: Object.values(SocialProvider) },
    role: { type: String, enum: Object.values(UserRole), required: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// Hashing the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  if (this.password) {
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword: string
): Promise<boolean> {
  return this.password
    ? bcrypt.compare(candidatePassword, this.password)
    : false;
};

export const User = model('User', userSchema);
