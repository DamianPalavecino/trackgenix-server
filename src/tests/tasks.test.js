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
const mockedTask3 = {
  description: 'see the grass grow',
};
const mockedTask4 = {
  betelgeuse: true,
};

let taskId;

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
    taskId = response.body.data._id;

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

describe('GET /task', () => {
  test('Should return status 200 when search a valid id', async () => {
    const response = await request(app).get(`/tasks/${taskId}`).send();

    expect(response.status).toBe(200);
  });
  test('Should return error false when search a valid id', async () => {
    const response = await request(app).get(`/tasks/${taskId}`).send();

    expect(response.body.error).toBe(false);
  });
  test('Should return error true when search a invalid id', async () => {
    const response = await request(app).get('/tasks/1234567892345678234567sd').send();

    expect(response.body.error).toBe(true);
  });
  test('Should return the task required', async () => {
    const response = await request(app).get(`/tasks/${taskId}`).send();

    expect(response.body.data.description).toBe(mockedTask1.description);
  });
});

describe('PUT /task/:id', () => {
  test('Should edit a task', async () => {
    const response = await request(app).put(`/tasks/${taskId}`).send(mockedTask3);

    expect(response.status).toBe(201);
    expect(response.body.data.description).toBe('see the grass grow');
  });
  test('Should return status 404 when search for a invalid id', async () => {
    const response = await request(app).put('/tasks/1234567892345678234567sd').send(mockedTask3);

    expect(response.status).toBe(404);
  });
  test('Should return status 400 when send a empty body', async () => {
    const response = await request(app).put(`/tasks/${taskId}`).send();

    expect(response.status).toBe(400);
  });
  test('Should return status 400 when send invalid keys and values', async () => {
    const response = await request(app).put(`/tasks/${taskId}`).send(mockedTask4);

    expect(response.status).toBe(400);
  });
});

describe('DELETE /task/:id', () => {
  test('Should delete a task', async () => {
    const response = await request(app).delete(`/tasks/${taskId}`).send();

    expect(response.status).toBe(204);
    expect(response.body.data).toBe(undefined);
  });
  test('Should return error when try to delete a invalid id', async () => {
    const response = await request(app).delete('/tasks/1234567892345678234567sd').send();

    expect(response.body.error).toBe(true);
    expect(response.status).toBe(404);
  });
});
