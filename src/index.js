/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

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

export default app;
