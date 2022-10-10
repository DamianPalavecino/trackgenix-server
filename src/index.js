import express from 'express';

const admins = require('./data/admins.json');

const app = express();
const employeeRouter = require('./resources/employees');

const port = process.env.PORT || 3000;

app.use(express.json());

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
