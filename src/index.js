// import express from 'express';

// const admins = require('./data/admins.json');
// const superAdmins = require('./data/super-admins.json');

// const superAdminsRouter = require('./controllers/super-admins');
// const employeeRouter = require('./controllers/employees');
// const taskRouter = require('./controllers/tasks');
// const adminsRouter = require('./controllers/admins');
// const projectsRouter = require('./controllers/projects');

// const app = express();

// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use('/tasks', taskRouter);
// app.use('/projects', projectsRouter);
// app.use('/admins', adminsRouter);
// app.use('/super-admins', superAdminsRouter);
// app.use('/employees', employeeRouter);

// app.get('/', async (req, res) => {
//   res.send('Hello World!');
// });

// app.get('/admins', (req, res) => {
//   res.status(200).json({
//     data: admins,
//   });
// });

// app.get('/super-admins', (req, res) => {
//   res.status(200).json({
//     data: superAdmins,
//   });
// });

// app.listen(port, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Example app listening on port ${port}`);
// });

import express from 'express';
import mongoose from 'mongoose';
import projectRoutes from './routes/projects';
import employeeRoutes from './models/employees';

const app = express();
const port = 5000;

app.use(express.json());

app.use('/projects', projectRoutes);
app.use('/employees', employeeRoutes);

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
