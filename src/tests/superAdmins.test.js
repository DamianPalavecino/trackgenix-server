import request from 'supertest';
import app from '../app';
// import superAdmins from '../controllers/super-admins';
import SuperAdmins from '../models/Super-admins';
import superAdminsSeed from '../seeds/superAdmins';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});
describe('GET/superAdmins', () => {
  test('should return status code 200', async () => {
    const response = await request(app).get('/superAdmins').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
});
