const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('add recipe', () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  afterEach(async () => {
    await db.query('DELETE FROM RecipeCard');
    await db.close();
  });

  describe('/profile/recipe', () => {
    describe('POST', () => {
      it('adds a recipe to the database', async () => {
        const res = await request(app).post('/profile/recipe').send({
            id: 12345,
            image: 'Test Image',
            title: 'Test Title'
          });
          expect(res.status).to.equal(200);
        

      


        const [[recipeAdded]] = await db.query(
          `SELECT * FROM RecipeCard WHERE id = 12345`
        );

        expect(recipeAdded.id).to.equal(12345);
        expect(recipeAdded.image).to.equal('Test Image');
        expect(recipeAdded.title).to.equal('Test Title')
      });
    });
  });
});