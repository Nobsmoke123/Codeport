import { LogInDtoData, RegisterDtoData } from '../dtos/auth.dto';
import { SocialProvider, User, UserRole } from '../models';
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

  async register(data: RegisterDtoData): Promise<void> {
    try {
      // Check if the email already exists
      const checkUser = await User.findOne({ email: data.email });

      if (checkUser) {
        throw new Error('User already exists.');
      }

      const user = new User({
        ...data,
        role: UserRole.Admin,
        socialProvider: SocialProvider.None,
      });
      await user.save();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
