import { LogInDtoData, RegisterDtoData } from '../dtos/auth.dto';
import { NotFoundError } from '../middlewares/ErrorClasses';
import { IUser, SocialProvider, User, UserRole } from '../models';
import { JWT } from '../utils/jwttool';

export class AuthService {
  async login(logInData: LogInDtoData): Promise<{ [key: string]: string }> {
    const { email, password } = logInData;

    // Check the user Database for the user
    const user = await User.findOne({
      email,
    });

    // If the user doesn't exist throw a 404 error
    if (!user) {
      throw new NotFoundError('Invalid username or password.');
    }

    // Compare passwords
    if (password && !(await user.comparePasswords(password))) {
      throw new NotFoundError('Invalid username or password.');
    }

    // if the user exists create a jwt token
    const token = JWT.sign({
      fullname: user.fullname,
      userId: user.id,
      role: user.role,
    });

    // return the jwt token
    return {
      access_token: token,
      fullName: user.fullname,
      userId: user._id,
      email: user.email,
    };
  }

  async register(
    data: RegisterDtoData
  ): Promise<Omit<IUser, 'password' | 'comparePasswords'>> {
    // Check if the email already exists
    const checkEmail = await User.findOne({ email: data.email });

    // Check if the username already exists
    const checkUsername = await User.findOne({ username: data.username });

    if (checkEmail || checkUsername) {
      throw new NotFoundError('Email or Username already exists.');
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
  }
}
