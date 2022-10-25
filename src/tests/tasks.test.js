/* eslint-disable no-useless-escape */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import AdminsSeed from '../seeds/admins';

const mockedAdmin1 = {
  name: 'mohammed',
  lastName: 'el armenio',
  email: 'kebap@gmail.com',
  password: 'tabule55852yuilvfghuil',
};
const mockedAdmin2 = {
  name: 'mohammed',
  email: 'kebap@gmail.com',
};
const mockedAdmin3 = {
  hola: 'chau',
  name: 'mohammed',
  lastName: 'el armenio',
  email: 'kebap@gmail.com',
  password: 'tabule55852yuilvfghuil',
};
const mockedAdmin4 = {
  name: '',
  lastName: '',
  email: 'kebap@gmail.com',
  password: 'tabule55852yuilvfghuil',
};

beforeAll(async () => {
  await Admins.collection.insertMany(AdminsSeed);
});

describe('GET /admins', () => {
  test('Should return status 200, correct message and error false.', async () => {
    const response = await request(app).get('/admins').send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Admins found');
    expect(response.body.error).toBe(false);
  });
});

describe('POST /admins', () => {
  test('Should return status 201, correct message and error false when all required fields are filled.', async () => {
    const response = await request(app).post('/admins').send(mockedAdmin1);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Admin created successfully');
    expect(response.body.error).toBe(false);
  });
  test('Should return status 400 and error true when lack some required key.', async () => {
    const response = await request(app).post('/admins').send(mockedAdmin2);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('Should return status 400 and error true when an unexpected key is sent.', async () => {
    const response = await request(app).post('/admins').send(mockedAdmin3);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('Should return status 400 and error true when empty body.', async () => {
    const response = await request(app).post('/admins').send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('Should return status 400 and error true when empty required field.', async () => {
    const response = await request(app).post('/admins').send(mockedAdmin4);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });
});
