require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const db = require('../data/database');

describe('Test Cast', function () {

    beforeAll((done) => {
      db.initDb((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    test('responds to /cast', async () => {
        const res = await request(app).get('/cast');
        expect(res.statusCode).toBe(200);
    },10000);

});
