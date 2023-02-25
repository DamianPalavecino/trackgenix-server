/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(
  process.env.DATABASE_URL,
  (error) => {
    if (error) {
      console.log('Fail connection to database', error);
    } else {
      console.log('Connected to database');
      app.listen(PORT, () => {
        console.log(`Server ready on port ${PORT}`);
      });
    }
  },
);
