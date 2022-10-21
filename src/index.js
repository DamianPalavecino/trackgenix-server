import express from 'express';
import mongoose from 'mongoose';
import superAdminsRoutes from './routes/super-admins';

const app = express();
const port = 5000;

app.use(express.json());
app.use('/super-admins', superAdminsRoutes);

const MONGO_URL = 'mongodb+srv://RadiumB:Radium2022@cluster0.qtxpp68.mongodb.net/Test';

mongoose.connect(
  MONGO_URL,
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log('Fail connection to database', error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Connected to database');
      app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server ready on port ${port}`);
      });
    }
  },
);
