require('dotenv').config();

const mongodb = require('./data/database');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');

const app = require('./app');
const port = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production';

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        const dbClient = mongodb.getDatabase();

        app.use(session({
            secret: process.env.SESSION_SECRET || 'wysiwyg',
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({ client: dbClient }),
            cookie: {
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax'
            }
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        if (isProduction) {
            app.enable('trust proxy');
        }

        app.listen(port, () => {
            console.log(`✅ Server running on port ${port}`);
        });
    }
});
