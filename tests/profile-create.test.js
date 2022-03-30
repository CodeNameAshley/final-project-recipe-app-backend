const { expect } = require('chai');
const { done } = require('mocha')
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create profile', () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  afterEach(async () => {
    await db.query('DELETE FROM FoodleProfile');
    await db.close();
  });

  describe('/profile', () => {
    describe('POST', () => {
      it('creates a new profile in the database', async () => {
        const res = await request(app).post('/profile').send({
            // id: 12345,
            email: 'test123@email.com',
            firstName: 'Ashley'
          });
          expect(res.status).to.equal(201);
        

      


        const [[profileCreated]] = await db.query(
          `SELECT * FROM FoodleProfile WHERE email = 'test123@email.com'`
        );

        // expect(profileCreated.id).to.equal(12345);
        expect(profileCreated.email).to.equal('test123@email.com');
        expect(profileCreated.firstName).to.equal('Ashley')
      });
    });
  });
});