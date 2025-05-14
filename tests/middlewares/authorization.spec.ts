import { getMockReq, getMockRes } from '@jest-mock/express';
import authorization from '../../src/middlewares/authorization';
import { JWT } from '../../src/utils/jwttool';
import mongoose from 'mongoose';

describe('Authorization Middleware', () => {
  it('should call next if authorization header is valid', () => {
    const mockRequest = getMockReq({
      headers: {
        authorization: 'Bearer token',
      },
    });

    const { res: mockRes } = getMockRes();

    jest.spyOn(JWT, 'verify').mockReturnValue({
      fullname: 'string',
      userId: 'string',
      role: 'string',
      iat: 12345566,
      exp: 12345566575,
      aud: 'string',
      iss: 'string',
      sub: 'string',
    });

    jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);

    const next = jest.fn();

    authorization(mockRequest, mockRes, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should throw UnauthorizedError if authorization header is not provided', () => {
    const mockRequest = getMockReq({
      headers: {},
    });

    const { res: mockRes } = getMockRes();

    const next = jest.fn();

    expect(() => authorization(mockRequest, mockRes, next)).toThrow(
      'You are unauthorized! Please log in.'
    );
  });

  it('should throw UnauthorizedError if authorization header token is empty', () => {
    const mockRequest = getMockReq({
      headers: {
        authorization: '',
      },
    });

    const { res: mockRes } = getMockRes();

    const next = jest.fn();

    expect(() => authorization(mockRequest, mockRes, next)).toThrow(
      'You are unauthorized! Please log in.'
    );
  });

  it('should throw Bad Request if token is not provided or invalid', () => {
    const mockRequest = getMockReq({
      headers: {
        authorization: 'Bearer invalidToken',
      },
    });

    const { res: mockRes } = getMockRes();

    const next = jest.fn();

    jest.spyOn(JWT, 'verify').mockReturnValue(null as any);

    expect(() => authorization(mockRequest, mockRes, next)).toThrow(
      'Bad Request!'
    );
  });

  it('should throw Bad Request if the returned userId is invalid', () => {
    const mockRequest = getMockReq({
      headers: {
        authorization: 'Bearer validToken',
      },
    });

    const { res: mockRes } = getMockRes();

    const next = jest.fn();

    jest.spyOn(JWT, 'verify').mockReturnValue({
      fullname: 'string',
      userId: 'string',
      role: 'string',
      iat: 12345566,
      exp: 12345566575,
      aud: 'string',
      iss: 'string',
      sub: 'string',
    });

    jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(false);

    expect(() => authorization(mockRequest, mockRes, next)).toThrow(
      'Bad Request!'
    );
  });
});
