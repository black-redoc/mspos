const mongoose = require('mongoose');
require('dotenv/config')

mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const conn = mongoose.connection;

conn.on('error', err => console.error(`Error in database connection => ${err}`));
conn.once('open', () => console.log('MongoDB is UP!'));