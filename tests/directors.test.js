require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const db = require('../data/database');

describe('Test Directors', function () {

    beforeAll((done) => {
      db.initDb((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    test('responds to /directors', async () => {
        const res = await request(app).get('/directors');
        expect(res.statusCode).toBe(200);
    },10000);

});
