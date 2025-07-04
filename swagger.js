const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';

const doc = {
    info: {
        title: 'CS341-TeamProject',
        description: 'W05 Project - Gabriel Feippe'
    },
    host:'cse341-teamproject-b6j0.onrender.com',
    //host: 'localhost:3000',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);