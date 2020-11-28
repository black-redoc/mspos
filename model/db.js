const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(
        process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then( _ => console.log('DB is connected!'))
        .catch(err => console.log("There're an error when connecting to DB", `ERROR: ${err}`));
}