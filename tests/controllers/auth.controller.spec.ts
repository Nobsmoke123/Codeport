import { AuthController } from '../../src/controllers';
import { AuthService } from '../../src/services';
import { SocialProvider, UserRole } from '../../src/models';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  authService = new AuthService();
  authController = new AuthController(authService);

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

  jest.spyOn(authService, 'register').mockImplementation(() => {
    return Promise.resolve({
      _id: mockUser.userId,
      fullname: mockUser.fullname,
      username: mockUser.username,
      email: mockUser.email,
      role: UserRole.User,
      socialProvider: SocialProvider.None,
      createdAt: mockUser.createdAt,
      updatedAt: mockUser.updatedAt,
    });
  });

  it('should login a user successfully', async () => {
    jest.spyOn(authService, 'login').mockResolvedValue({
      access_token: 'mockAccessToken',
      fullName: mockUser.fullname,
      email: mockUser.email,
      userId: mockUser.userId,
    });

    const mockReq = getMockReq({
      body: {
        email: 'test@email.com',
        password: 'pass1234',
      },
    });

    const { res: mockRes } = getMockRes();

    await authController.login(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });
});
