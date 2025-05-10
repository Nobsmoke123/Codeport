import { AuthController } from '../../src/controllers';
import { AuthService } from '../../src/services';
import { SocialProvider, UserRole } from '../../src/models';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('AuthController', () => {
  const authService = new AuthService();
  const authController = new AuthController(authService);

  const mockUser = {
    email: 'test@email.com',
    fullname: 'Test User',
    username: 'JohnDoe',
    userId: '123',
    role: 'user',
    socialProvider: 'none',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should login a user successfully', async () => {
    const mockedLoginResponse = {
      access_token: 'mockAccessToken',
      fullName: mockUser.fullname,
      email: mockUser.email,
      userId: mockUser.userId,
    };

    jest.spyOn(authService, 'login').mockResolvedValue(mockedLoginResponse);

    const mockReq = getMockReq({
      body: {
        email: 'test@email.com',
        password: 'pass1234',
      },
    });

    const { res: mockRes } = getMockRes();

    await authController.login(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      data: {
        ...mockedLoginResponse,
      },
    });
  });

  it('should register a user successfully', async () => {
    const mockRegisterResponse = {
      _id: mockUser.userId,
      fullname: mockUser.fullname,
      username: mockUser.username,
      email: mockUser.email,
      role: UserRole.User,
      socialProvider: SocialProvider.None,
      createdAt: mockUser.createdAt,
      updatedAt: mockUser.updatedAt,
    };

    jest.spyOn(authService, 'register').mockResolvedValue(mockRegisterResponse);

    const mockReq = getMockReq({
      body: {
        email: mockUser.email,
        fullname: mockUser.fullname,
        username: mockUser.username,
        password: 'pass1234',
        socialProvider: SocialProvider.None,
        role: UserRole.User,
      },
    });
    const { res: mockRes } = getMockRes();

    await authController.register(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockRegisterResponse);
  });
});
