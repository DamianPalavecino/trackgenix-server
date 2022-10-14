import express from 'express';

const admins = require('./data/admins.json');
const superAdmins = require('./data/super-admins.json');

const superAdminsRouter = require('./resources/super-admins');
const employeeRouter = require('./resources/employees');
const adminsRouter = require('./resources/admins');
const projectsRouter = require('./resources/projects');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/projects', projectsRouter);
app.use('/admins', adminsRouter);
app.use('/super-admins', superAdminsRouter);
app.use('/employees', employeeRouter);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.get('/super-admins', (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
