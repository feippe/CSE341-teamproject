require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const db = require('../data/database');

describe('Test Movies', function () {

    beforeAll((done) => {
      db.initDb((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    test('responds to /movies', async () => {
        const res = await request(app).get('/movies');
        expect(res.statusCode).toBe(200);
    },10000);

});
