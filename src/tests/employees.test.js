import request from 'supertest';
// import mongoose from 'mongoose';
import app from '../app';
import Projects from '../models/Projects';
import Employees from '../models/Employees';
import projectsSeed from '../seeds/projects';
import employeesSeed from '../seeds/employee';

/* const mockedEmployees = {
  _id: mongoose.Types.ObjectId('6352b5e596170b594dc07cf2'),
  name: 'marcus',
  lastName: 'postgirl',
  phone: '1234567890',
  email: 'lorlor0@furl.net',
  password: 'pacoelflaco123',
  projects: [
    { _id: mongoose.Types.ObjectId('634d73ca260e0ee548943dc3') },
    { _id: mongoose.Types.ObjectId('634d924e260e0ee548943dc7') },
  ],
}; */

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
  await Projects.collection.insertMany(projectsSeed);
});

describe('GET /employees', () => {
  describe('GET all', () => {
    test('Status, error, data and message tests - Successful', async () => {
      const response = await request(app).get('/employees').send();

      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.message).toBe('Employees found');
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET query filter', () => {
    test('Query param must be correct', async () => {
      const response = await request(app).get('/employees?asd=marcus').send();

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('An error occurred');
      expect(response.body.error).toBe(true);
    });

    test('Name query param must be correct and message be: "Employee found" - Status 200', async () => {
      const response = await request(app).get('/employees?name=marcus').send();

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Employee found');
    });

    test('Last name query param must be correct - Status 200', async () => {
      const response = await request(app).get('/employees?lastName=postgirl').send();

      expect(response.status).toBe(200);
    });

    test('Phone query param must be correct - Status 200', async () => {
      const response = await request(app).get('/employees?phone=1234567890').send();

      expect(response.status).toBe(200);
    });

    test('Email query param must be correct - Status 200', async () => {
      const response = await request(app).get('/employees?email=lorlor0@furl.net').send();

      expect(response.status).toBe(200);
    });

    test('Name query param must be correct - Status 404', async () => {
      const response = await request(app).get('/employees?name=a').send();

      expect(response.status).toBe(404);
    });

    test('Last name query param must be correct - Status 404', async () => {
      const response = await request(app).get('/employees?lastName=b').send();

      expect(response.status).toBe(404);
    });

    test('Phone query param must be correct - Status 404', async () => {
      const response = await request(app).get('/employees?phone=2').send();

      expect(response.status).toBe(404);
    });

    test('Email query param must be correct - Status 404', async () => {
      const response = await request(app).get('/employees?email=lorlaor0@furl.net').send();

      expect(response.status).toBe(404);
    });
  });
});
