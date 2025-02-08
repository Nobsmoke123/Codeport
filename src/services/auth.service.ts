import { LogInDtoData, RegisterDtoData } from '../dtos/auth.dto';
import { IUser, SocialProvider, User, UserRole } from '../models';
import { JWT } from '../utils/jwttool';
import { Logger } from '../utils/logger';

export class AuthService {
  async login(logInData: LogInDtoData): Promise<{ [key: string]: string }> {
    try {
      const { email, password } = logInData;

      // Check the user Database for the user
      const user = await User.findOne({
        email,
      });

      // If the user doesn't exist throw a 404 error
      if (!user) {
        throw new Error('404 - User not Found');
      }

      // Compare passwords
      if (password && !(await user.comparePasswords(password))) {
        throw new Error('Invalid email or password');
      }

      // if the user exists create a jwt token
      const token = JWT.sign({ fullname: user.fullname, userId: user.id });

      // return the jwt token
      return {
        access_token: token,
        fullName: user.fullname,
        userId: user._id,
        email: user.email,
      };
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async register(
    data: RegisterDtoData
  ): Promise<Omit<IUser, 'password' | 'comparePasswords'>> {
    try {
      // Check if the email already exists
      const checkEmail = await User.findOne({ email: data.email });

      // Check if the username already exists
      const checkUsername = await User.findOne({ username: data.username });

      if (checkEmail || checkUsername) {
        throw new Error('Email or Username already exists.');
      }

      // Hash password
      const user = new User({
        ...data,
        role: UserRole.Admin,
        socialProvider: SocialProvider.None,
      });
      await user.save();

      return {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role,
        socialProvider: user.socialProvider,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      };
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
