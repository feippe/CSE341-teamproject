require('dotenv').config();
const request = require('supertest');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const createApp = require('../app');
const db = require('../data/database');
require('../auth/passport');

let app;

beforeAll((done) => {
  db.initDb((err) => {
    if (err) return done(err);
    const dbClient = db.getDatabase();
    const sessionMiddleware = session({
      secret: process.env.SESSION_SECRET || 'test_secret',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ client: dbClient }),
      cookie: { secure: false }
    });
    app = createApp(sessionMiddleware);
    done();
  });
});

describe('Test Directors', function () {
    test('responds to /directors', async () => {
        const res = await request(app).get('/directors');
        expect(res.statusCode).toBe(200);
    },10000);

});
