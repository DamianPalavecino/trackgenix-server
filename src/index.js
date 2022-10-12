import express from 'express';

const admins = require('./data/admins.json');
const employeeRouter = require('./resources/employees');
const adminsRouter = require('./resources/admins');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/employees', employeeRouter);
app.use('/admins', adminsRouter);
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
