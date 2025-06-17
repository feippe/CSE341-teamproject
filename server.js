require('dotenv').config();
const mongodb = require('./data/database');
const MongoStore = require('connect-mongo');
const session = require('express-session');


const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
        return;
    } 
    const dbClient = mongodb.getDatabase();
    require('./auth/passport');

    const sessionMiddleware = session({
        secret: process.env.SESSION_SECRET || 'wysiwyg',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ client: dbClient }),
        cookie: {
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax'
        }
    });
    const createApp = require('./app');
    const app = createApp(sessionMiddleware);
    app.set('trust proxy', 1); 
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
});
