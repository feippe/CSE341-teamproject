require('dotenv').config();
const mongodb = require('../data/database');

describe('DB connection', () => {
    beforeAll((done) => {
        mongodb.initDb((err, db) => {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
    });
    it('Get connection', () => {
        const db = mongodb.getDatabase();
        expect(db).not.toBeNull();
    });
});