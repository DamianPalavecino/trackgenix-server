import request from 'supertest';
import app from '../app';
// import superAdmins from '../controllers/super-admins';
import SuperAdmins from '../models/Super-admins';
import superAdminsSeed from '../seeds/superAdmins';

const mockedSuperAdmin = {
  name: 'Lucas',
  lastName: 'Salame',
  email: 'salamelucas@gmail.com',
  password: 'pacoelflaco123',
};

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

describe('POST/superAdmins', () => {
  test('should create an super admin', async () => {
    const response = await request(app).post('/superAdmins').send(mockedSuperAdmin);
    expect(response.status).toBe(201);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBe(false);
  });
  test('should not create an super admin', async () => {
    const response = await request(app).post('/superAdmins').send();
    expect(response.status).toBe(400);
    expect(response.body.data.length).toBe(0);
    expect(response.body.error).toBe(true);
  });
});
