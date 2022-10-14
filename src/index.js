import express from 'express';

const admins = require('./data/admins.json');

const employeeRouter = require('./resources/employees');
const taskRouter = require('./resources/tasks');
const adminsRouter = require('./resources/admins');
const projectsRouter = require('./resources/projects');
const taskRouter = require('./resources/tasks');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/tasks', taskRouter);

app.use('/projects', projectsRouter);

app.use('/admins', adminsRouter);

app.use('/employees', employeeRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
