import { AuthService } from '../../src/services';
import { JWT } from '../../src/utils/jwttool';
import { IUser, User } from '../../src/models';
import { HydratedDocument } from 'mongoose';
import { IUserMethods } from '../../src/models/Users.model';

describe('AuthService', () => {
  const authService = new AuthService();

  const mockLoginResponse = {
    access_token: 'test-token',
    fullName: 'John Doe',
    userId: '123',
    email: 'test@email.com',
  };

  const mockedLoginInput = {
    email: 'test@email.com',
    password: 'pass1234',
  };

  const mockedResgisterInput = {
    fullname: 'John Doe',
    username: 'nicolas',
    email: 'nick@email.com',
    password: 'pass123',
  };

  beforeAll(() => {
    jest.spyOn(JWT, 'sign').mockReturnValue('test-token');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Login', () => {
    it('should login a user and return a token', async () => {
      const mockedUser = {
        _id: '123',
        fullname: 'John Doe',
        email: mockedLoginInput.email,
        role: 'user',
        comparePasswords: jest.fn().mockResolvedValue(true),
      };

      jest.spyOn(User, 'findOne').mockResolvedValue({ ...mockedUser });

      const result = await authService.login(mockedLoginInput);
      expect(result).toMatchObject(mockLoginResponse);
      expect(result.access_token).toBe(mockLoginResponse.access_token);
      expect(User.findOne).toHaveBeenCalledWith({
        email: mockedLoginInput.email,
      });
      expect(JWT.sign).toHaveBeenCalledTimes(1);
      expect(mockedUser.comparePasswords).toHaveBeenCalledWith(
        mockedLoginInput.password
      );
      expect(JWT.sign).toHaveBeenCalledWith({
        fullname: 'John Doe',
        userId: '123',
        role: 'user',
      });
    });

    it('should throw an error if the user does not exist', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      jest.spyOn(JWT, 'sign').mockReturnValue('test-token');

      await expect(authService.login(mockedLoginInput)).rejects.toThrow(
        'Invalid username or password.'
      );

      expect(User.findOne).toHaveBeenCalledWith({
        email: mockedLoginInput.email,
      });

      expect(JWT.sign).not.toHaveBeenCalled();
    });

    it('should throw an error if the password is empty or incorrect', async () => {
      const mockedUser = {
        _id: '123',
        fullname: 'John Doe',
        email: 'janedoe@email.com',
        role: 'user',
        comparePasswords: jest.fn().mockResolvedValue(false),
      };

      jest.spyOn(User, 'findOne').mockResolvedValue({ ...mockedUser });

      await expect(authService.login(mockedLoginInput)).rejects.toThrow(
        'Invalid username or password.'
      );

      expect(User.findOne).toHaveBeenCalledWith({
        email: mockedLoginInput.email,
      });

      expect(mockedUser.comparePasswords).toHaveBeenCalledWith(
        mockedLoginInput.password
      );

      expect(JWT.sign).not.toHaveBeenCalled();
    });
  });

  describe('Register', () => {
    it('should register a new user', async () => {
      const mockedUser = {
        _id: '123',
        fullname: mockedResgisterInput.fullname,
        username: mockedResgisterInput.username,
        email: mockedResgisterInput.email,
        role: 'admin',
        socialProvider: 'none',
        password: mockedResgisterInput.password,
        createdAt: new Date(),
        updatedAt: new Date(),
        comparePasswords: jest.fn().mockResolvedValue(true),
        save: jest.fn(),
      } as unknown as HydratedDocument<IUser, IUserMethods>;

      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      jest.spyOn(User, 'build').mockReturnValue(mockedUser);

      const result = await authService.register(mockedResgisterInput);

      expect(result).toMatchObject({
        _id: mockedUser._id,
        fullname: mockedUser.fullname,
        username: mockedUser.username,
        email: mockedUser.email,
        role: mockedUser.role,
        socialProvider: mockedUser.socialProvider,
        createdAt: mockedUser.createdAt,
        updatedAt: mockedUser.updatedAt,
      });
      expect(User.findOne).toHaveBeenCalledWith({
        email: mockedResgisterInput.email,
      });
      expect(User.build).toHaveBeenCalledWith({
        ...mockedResgisterInput,
        role: 'admin',
        socialProvider: 'none',
      });
      expect(mockedUser.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the email already exists', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue({
        email: mockedResgisterInput.email,
        username: mockedResgisterInput.username,
        fullname: mockedResgisterInput.fullname,
      });

      await expect(authService.register(mockedResgisterInput)).rejects.toThrow(
        'Email or Username already exists.'
      );

      expect(User.findOne).toHaveBeenCalledWith({
        email: mockedResgisterInput.email,
      });
      expect(User.findOne).toHaveBeenCalledWith({
        username: mockedResgisterInput.username,
      });
      expect(User.build).not.toHaveBeenCalled();
    });
  });
});
