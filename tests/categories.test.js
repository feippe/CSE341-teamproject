require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const db = require('../data/database');

describe('Test Categories', function () {

    beforeAll((done) => {
      db.initDb((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    test('responds get to /categories', async () => {
        const res = await request(app).get('/categories');
        expect(res.statusCode).toBe(200);
    },10000);

});
