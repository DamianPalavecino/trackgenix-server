import request from 'supertest';
import app from '../app';
import Timesheets from '../models/Timesheets';
import timesheetsSeed from '../seeds/timesheets';

beforeAll(async () => {
  await Timesheets.collection.insertMany(timesheetsSeed);
});

describe('GET /timesheets', () => {
  test('should return status code 200', async () => {
    const response = await request(app).get('/timesheets').send();
    console.log(response.body.data);
    expect(response.status).toBe(200);
  });
});
