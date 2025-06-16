require('dotenv').config();
const mongodb = require('./data/database');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const createApp = require('./app');

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
        return;
    } 
    const dbClient = mongodb.getDatabase();
    const sessionMiddleware = session({
        secret: process.env.SESSION_SECRET || 'wysiwyg',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ client: dbClient }),
        cookie: {
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'lax'
        }
    });
    const app = createApp(sessionMiddleware);
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
});
