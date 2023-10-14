const mongoose = require('mongoose');

const db = process.env.DB_URI;
const connectDatabase = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB connected!`);
    } catch (err) {
        console.log(`Error => , ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDatabase;