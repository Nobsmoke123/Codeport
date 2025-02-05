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

export type User = {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password?: string;
  socialProvider: SocialProvider;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};
