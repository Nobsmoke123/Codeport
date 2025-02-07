import mongoose from 'mongoose';

export const Connection = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL || '';

    if (MONGODB_URL === '') {
      throw new Error('MONGODB_URL is required for the application to work!');
    }

    const connection = await mongoose.connect(MONGODB_URL);
    console.log('Database connected successfully.');
  } catch (error) {
    console.log(error);
    throw error; // Handle it in the index.ts file
  }
};
