require('dotenv').config();
const mongodb = require('./data/database');
const app = require('./app');
const port = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production';

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('✅ DB connected');
        app.listen(port, () => {
            console.log(`🚀 server running on port ${port}`);
        });
    }
});
