import DatabaseConnection from '../../src/utils/connection';
import { Logger } from '../../src/utils/logger';
import mongoose from 'mongoose';

describe('Database Connection', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('connect', () => {
    it('should connect to the database successfully', async () => {
      process.env.MONGODB_URL = 'mongodb://localhost:27017/testdb';
      jest.spyOn(mongoose, 'connection', 'get').mockReturnValue({
        readyState: 0,
      } as any);
      jest.spyOn(mongoose, 'connect').mockResolvedValue({
        connection: {
          readyState: 1,
        },
      } as any);

      jest.spyOn(Logger, 'info').mockImplementation(() => Logger);

      await DatabaseConnection.connect();
      expect(Logger.info).toHaveBeenCalledWith(
        'Database connected successfully.'
      );
    });

    it('should throw an error if the database is already connected', async () => {
      process.env.MONGODB_URL = 'mongodb://localhost:27017/testdb';
      jest.spyOn(mongoose, 'connection', 'get').mockReturnValue({
        readyState: 1,
      } as any);
      jest.spyOn(mongoose, 'connect').mockResolvedValue({
        connection: {
          readyState: 1,
        },
      } as any);

      jest.spyOn(Logger, 'info').mockImplementation(() => Logger);

      await DatabaseConnection.connect();
      expect(Logger.info).toHaveBeenCalledWith(
        'Database is already connected.'
      );
    });

    it('should throw an error if MONGODB_URL is undefined', async () => {
      process.env.MONGODB_URL = '';

      await expect(DatabaseConnection.connect()).rejects.toThrow(
        'MONGODB_URL is required for the application to work!'
      );
    });

    it('mongoose.connect should throw an error', async () => {
      process.env.MONGODB_URL = 'mongodb://localhost:27017/testdb';

      jest.spyOn(mongoose, 'connection', 'get').mockReturnValue({
        readyState: 0,
      } as any);

      jest
        .spyOn(mongoose, 'connect')
        .mockImplementation(() =>
          Promise.reject(new Error('Database connection error'))
        );

      jest.spyOn(Logger, 'info').mockImplementation(() => Logger);
      jest.spyOn(Logger, 'error').mockImplementation(() => Logger);

      await expect(DatabaseConnection.connect()).rejects.toThrow();
      expect(Logger.error).toHaveBeenCalledWith(
        'Database connection error: ',
        expect.any(Error)
      );
    });
  });

  describe('closeConnetion', () => {
    it('should close connection successfully', async () => {
      jest.spyOn(mongoose, 'connection', 'get').mockReturnValue({
        readyState: 1,
        close: jest.fn(),
      } as any);

      jest.spyOn(Logger, 'info').mockImplementation(() => Logger);

      await DatabaseConnection.closeConnection();
      expect(Logger.info).toHaveBeenCalledWith('Database connection closed.');
    });

    it('should throw an error if no database connection exist', async () => {
      jest.spyOn(mongoose, 'connection', 'get').mockReturnValue({
        readyState: 0,
        close: jest.fn(),
      } as any);

      jest.spyOn(Logger, 'info').mockImplementation(() => Logger);

      await DatabaseConnection.closeConnection();
      expect(Logger.info).toHaveBeenCalledWith(
        'No active database connection to close.'
      );
    });

    it('mongoose.connection.close should throw an error', async () => {
      jest.spyOn(mongoose, 'connection', 'get').mockReturnValue({
        readyState: 1,
        close: jest
          .fn()
          .mockRejectedValue(new Error('Connection close failed.')),
      } as any);

      jest.spyOn(Logger, 'error').mockImplementation(() => Logger);

      await expect(DatabaseConnection.closeConnection()).rejects.toThrow(
        'Connection close failed.'
      );

      expect(Logger.error).toHaveBeenCalledWith(
        'Database connection error: ',
        expect.any(Error)
      );
    });
  });
});
