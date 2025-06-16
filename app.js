const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

require('dotenv').config();
require('./auth/passport');

const isProduction = process.env.NODE_ENV === 'production';
function createApp(sessionMiddleware) {
    const app = express();
    app
    .use(cors({
        origin: isProduction
            ? 'https://cse341-teamproject-b6j0.onrender.com'
            : 'http://localhost:3000',
        credentials: true
    }))
    .use(sessionMiddleware)
    .use(passport.initialize())
    .use(passport.session())
    .use(bodyParser.json())
    .use('/', require('./routes'));
    return app;
}
module.exports = createApp;