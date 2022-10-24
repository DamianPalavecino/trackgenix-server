/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import tasksSeed from '../seeds/tasks';

const mockedTask1 = {
  description: 'improve logic',
};
const mockedTask2 = {
  description: '',
};

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
});

describe('GET /task', () => {
  test('Should return status 200', async () => {
    const response = await request(app).get('/tasks').send();

    expect(response.status).toBe(200);
  });
  test('Should return error false', async () => {
    const response = await request(app).get('/tasks').send();

    expect(response.body.error).toBe(false);
  });
  test('Should return more than one tasks', async () => {
    const response = await request(app).get('/tasks').send();

    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('Should return status 200 when filter by query params', async () => {
    const response = await request(app).get('/tasks?description=Knowledge').send();

    expect(response.status).toBe(200);
  });
  test('Should return status 404 when not found any filtered task', async () => {
    const response = await request(app).get('/tasks?description=Paquito').send();

    expect(response.status).toBe(404);
  });
  test('Should return status 400 when filter by invalid query params', async () => {
    const response = await request(app).get('/tasks?address=moldavia').send();

    expect(response.status).toBe(400);
  });
});

describe('POST /task', () => {
  test('Should return status 201', async () => {
    const response = await request(app).post('/tasks').send(mockedTask1);

    expect(response.status).toBe(201);
  });
  test('Should return error code 400 when send a description empty', async () => {
    const response = await request(app).post('/tasks').send(mockedTask2);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('Should return error true when send a description empty', async () => {
    const response = await request(app).post('/tasks').send();

    expect(response.body.error).toBe(true);
  });
  test('Should return status 400 when send a empty body', async () => {
    const response = await request(app).post('/tasks').send();

    expect(response.status).toBe(400);
  });
});
