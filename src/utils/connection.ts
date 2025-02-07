import mongoose from 'mongoose';

export const Connection = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;

    await mongoose.connect('');
  } catch (error) {
    console.log(error);
  }
};
