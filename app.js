const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

require('dotenv').config();
require('./auth/passport');

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, OPTIONS'
        );
        next();
    })
    .use('/', require('./routes'))
    .use(cors({
        origin: isProduction
            ? 'https://cse341-teamproject-b6j0.onrender.com'
            : 'http://localhost:3000',
        credentials: true
    }));

module.exports = app;