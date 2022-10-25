import request from 'supertest';
import app from '../app';

import Projects from '../models/Projects';
import Employees from '../models/Employees';

import projectsSeed from '../seeds/projects';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
  await Employees.collection.insertMany(employeesSeed);
});

const msg200 = 'SUCCESS - 200 status code - successfull request';
const msg201 = 'SUCCESS - 201 status cude - written data in DB';
const msg400 = 'ERROR - 400 status code - bad request';
const msg404 = 'ERROR - 404 status code - nonexistent on DB';

const projectOK = {
  name: 'Trying to post a project',
  description: 'Posting a project with superjet',
  startDate: '2020-01-01T00:00:00.000+00:00',
  endDate: '2020-01-02T00:00:00.000+00:00',
  clientName: 'Graves Braum',
};

const projectMissingRequieredKey = {
  name: 'Trying to post a project',
  description: 'Posting a project with superjet',
  startDate: '2020-01-01T00:00:00.000+00:00',
  endDate: '2020-01-02T00:00:00.000+00:00',
};

const projectFullFutureDate = {
  name: 'Trying to post a project',
  description: 'Posting a project with superjet',
  startDate: '2020-01-01T00:00:00.000+00:00',
  endDate: '2025-01-02T00:00:00.000+00:00',
  clientName: 'Graves Braum',
};

const projectUndefinedKey = {
  fakeKey1234: 'This is a fake value',
  name: 'Trying to post a project',
  description: 'Posting a project with superjet',
  startDate: '2020-01-01T00:00:00.000+00:00',
  endDate: '2020-01-02T00:00:00.000+00:00',
  clientName: 'Graves Braum',
};

const projectFullEmptyValue = {
  name: '',
  description: 'Posting a project with superjet',
  startDate: '2020-01-01T00:00:00.000+00:00',
  endDate: '2020-01-02T00:00:00.000+00:00',
  clientName: 'Graves Braum',
};

const projectName1Char = {
  name: 'a',
  description: 'Posting a project with superjet',
  startDate: '2020-01-01T00:00:00.000+00:00',
  endDate: '2020-01-02T00:00:00.000+00:00',
  clientName: 'Graves Braum',
};

const projectName51Char = {
  name: '123456789012345678901234567890123456789012345678901',
  description: 'Posting a project with superjet',
  startDate: '2020-01-01T00:00:00.000+00:00',
  endDate: '2020-01-02T00:00:00.000+00:00',
  clientName: 'Graves Braum',
};

const projectArray = [projectOK, projectOK];

const arrayInsteadOfKey = {
  name: projectOK,
  description: 'Posting a project with superjet',
  startDate: '2020-01-01T00:00:00.000+00:00',
  endDate: '2020-01-02T00:00:00.000+00:00',
  clientName: 'Graves Braum',
};

const validId = '634d73ca260e0ee548943dc3';

describe('GET /projects', () => {
  describe(msg200, () => {
    test('getAll with a non empty DB', async () => {
      const response = await request(app).get('/projects').send();
      expect(response.status).toBe(200);
      expect(response.body.error).toBe(false);
    });
    test('getById with an existent ID on DB', async () => {
      const response = await request(app).get(`/projects/${validId}`).send();
      expect(response.status).toBe(200);
    });
  });
  describe(msg400, () => {
    test('getById with invalid ID', async () => {
      const response = await request(app).get('/projects/1').send();
      expect(response.status).toBe(400);
    });
  });
  describe(msg404, () => {
    test('getById with valid but inexistent ID', async () => {
      const response = await request(app).get('/projects/634d73ca260e0ee548943dc4').send();
      expect(response.status).toBe(404);
    });
  });
});

describe('POST /projects', () => {
  describe(msg201, () => {
    test('valid body req', async () => {
      const response = await request(app).post('/projects').send(projectOK);
      expect(response.status).toBe(201);
    });
  });
  describe(msg400, () => {
    test('missing requiered key in body req', async () => {
      const response = await request(app).post('/projects').send(projectMissingRequieredKey);
      expect(response.status).toBe(400);
    });
    test('future date in body req', async () => {
      const response = await request(app).post('/projects').send(projectFullFutureDate);
      expect(response.status).toBe(400);
    });
    test('key in body req not defined on schema', async () => {
      const response = await request(app).post('/projects').send(projectUndefinedKey);
      expect(response.status).toBe(400);
    });
    test('empty key value on body req', async () => {
      const response = await request(app).post('/projects').send(projectFullEmptyValue);
      expect(response.status).toBe(400);
    });
    test('name shorter than 3 characters', async () => {
      const response = await request(app).post('/projects').send(projectName1Char);
      expect(response.status).toBe(400);
    });
    test('name longer than 50 characters', async () => {
      const response = await request(app).post('/projects').send(projectName51Char);
      expect(response.status).toBe(400);
    });
    test('array on body req', async () => {
      const response = await request(app).post('/projects').send(projectArray);
      expect(response.status).toBe(400);
    });
    test('array on key value', async () => {
      const response = await request(app).post('/projects').send(arrayInsteadOfKey);
      expect(response.status).toBe(400);
    });
  });
});
