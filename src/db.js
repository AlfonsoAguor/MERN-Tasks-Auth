import mongoose from 'mongoose';
import { MONGODB_URI } from './config.js';

export const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    await mongoose.connect(MONGODB_URI); // Sin opciones obsoletas
    console.log('>>>> DB is connected');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};
