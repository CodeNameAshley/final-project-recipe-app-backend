// tests/artist-create.js
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('create a profile', () => {
  describe('/profile', () => {
    describe('POST', () => {
      it('creates a new profile in the database', async () => {
        const res = await request(app).post('/profile').send({
          id: 12345,
          email: 'test123@email.com',
        });

        expect(res.status).to.equal(201);
      });
    });
  });
});