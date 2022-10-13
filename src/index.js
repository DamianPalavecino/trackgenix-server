// use "import" to import libraries
import express from 'express';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const superAdmins = require('./data/admins.json');
const employeeRouter = require('./resources/employees');
const adminsRouter = require('./resources/admins');
const superAdminsRouter = require('./resources/super-admins');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/employees', employeeRouter);
app.use('/admins', adminsRouter);
app.use('/super-admins', superAdminsRouter);
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
