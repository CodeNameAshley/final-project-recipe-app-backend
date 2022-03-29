// tests/profile-get.test.js
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('get profile', () => {
  let db;
  let profile;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO FoodleProfile (email, firstName) VALUES(?, ?)', [
        'email1@email.com',
        'Eriq',
      ]),
      db.query('INSERT INTO FoodleProfile (email, firstName) VALUES(?, ?)', [
        'email2@email.com',
        'Khalid',
      ]),
      db.query('INSERT INTO FoodleProfile (email, firstName) VALUES(?, ?)', [
        'email3@email.com',
        'Ashley',
      ]),
    ]);

    [profile] = await db.query('SELECT * from FoodleProfile');
  });

  afterEach(async () => {
    await db.query('DELETE FROM FoodleProfile');
    await db.close();
  });

  describe('/profile', () => {
    describe('GET', () => {
      it('returns all created profiles in the database', async () => {
        const res = await request(app).get('/profile').send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((createdProfile) => {
          const expected = profile.find((a) => a.id === createdProfile.id);

          expect(createdProfile).to.deep.equal(expected);
        });
      });
    });
  });
});