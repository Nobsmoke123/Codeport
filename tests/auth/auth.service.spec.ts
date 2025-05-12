import { AuthService } from '../../src/services';
import { JWT } from '../../src/utils/jwttool';
import { User } from '../../src/models';

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
    it('should register a new user', async () => {});
  });
});
