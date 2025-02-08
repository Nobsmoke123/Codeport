import mongoose from 'mongoose';
import { Logger } from './logger';

class DatabaseConnection {
  private client?: mongoose.Connection;

  async connect() {
    try {
      const MONGO_URL = process.env.MONGODB_URL || '';

      if (MONGO_URL === '') {
        throw new Error('MONGODB_URL is required for the application to work!');
      }

      // Check if there's already a database connection
      if (mongoose.connection.readyState === 1) {
        Logger.info('Database is already connected.');
        return;
      }

      const db = await mongoose.connect(MONGO_URL);

      if (db.connection.readyState === 1) {
        Logger.info('Database connected successfully.');
        this.client = db.connection;
      }
    } catch (error) {
      Logger.error('Database connection error: ', error);
      throw error; // Handle it in the index.ts file
    }
  }

  async closeConnection() {
    try {
      // Check if there's a database connection to close.
      if (!this.client) {
        Logger.info('No active database connection to close.');
        return;
      }

      // Close the database connection
      await this.client?.close();
      Logger.info('Database connection closed.');
    } catch (error) {
      Logger.error('Database connection error: ', error);
      throw error;
    }
  }
}

export default new DatabaseConnection();
