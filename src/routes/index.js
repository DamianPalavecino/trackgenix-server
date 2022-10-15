import express from 'express';
import mongoose from 'mongoose';
import projectRoutes from './projects';

const app = express();
const port = 5000;

app.use(express.json());

app.use('/projects', projectRoutes);

const MONGO_URL = ' mongodb+srv://RadiumB:RadiumB@cluster0.qtxpp68.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      console.log('Fail connction to database', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);
