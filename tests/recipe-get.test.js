// tests/recipe-get.test.js
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('get recipes', () => {
  let db;
  let recipes;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO RecipeCard (id, image, title) VALUES(?, ?, ?)', [
        12345,
        'Cucumber Roll Image',
        'Cucumber Maki'
      ]),
      db.query('INSERT INTO RecipeCard (id, image, title) VALUES(?, ?, ?)', [
        67890,
        'Peach Pie Image',
        'Peach Mango Pie'
      ]),
      db.query('INSERT INTO RecipeCard (id, image, title) VALUES(?, ?, ?)', [
        45678,
        'Sisig Image',
        'Sizzling Tuna Sisig'
      ]),
    ]);

    [recipes] = await db.query('SELECT * from RecipeCard');
  });

  afterEach(async () => {
    await db.query('DELETE FROM RecipeCard');
    await db.close();
  });

  describe('/profile/recipe', () => {
    describe('GET', () => {
      it('returns all added recipes in the database', async () => {
        const res = await request(app).get('/profile/recipe').send();

        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(3);

        res.body.forEach((addedRecipes) => {
          const expected = recipes.find((a) => a.id === addedRecipes.id);

          expect(addedRecipes).to.deep.equal(expected);
        });
      });
    });
  });
});