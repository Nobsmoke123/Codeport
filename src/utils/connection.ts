import mongoose from 'mongoose';

class DatabaseConnection {
  CONNECTION_URL: string;

  CONNECTION = '';

  constructor() {
    this.CONNECTION_URL = process.env.MONGODB_URL || '';
  }

  async Connect() {
    try {
      if (this.CONNECTION_URL === '') {
        throw new Error('MONGODB_URL is required for the application to work!');
      }

      this.CONNECTION = await mongoose.connect(this.CONNECTION_URL);
      console.log('Database connected successfully.');
    } catch (error) {
      console.log(error);
      throw error; // Handle it in the index.ts file
    }
  }

  async ConnectionClose() {}
}

export const Connection = async () => {};
