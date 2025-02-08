import { LogInDtoData } from '../dtos/login.dto';
import { User } from '../models';
import { Logger } from '../utils/logger';

export class AuthService {
  async login(logInData: LogInDtoData): Promise<void> {
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

      // return the jwt token
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async register(): Promise<void> {}
}
