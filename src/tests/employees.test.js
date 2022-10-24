import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import Employees from '../models/Employees';
import projectsSeed from '../seeds/projects';
import employeesSeed from '../seeds/employee';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
  await Projects.collection.insertMany(projectsSeed);
});

describe('GET /employees', () => {
  test('should return status code 200', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
  });
});
