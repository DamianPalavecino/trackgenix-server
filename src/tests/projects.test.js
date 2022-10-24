import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

describe('GET /projects', () => {
  test('should return status code 200', async () => {
    const response = await request(app).get('/projects').send();
    console.log(response.body.data);
    expect(response.status).toBe(200);
  });
});
