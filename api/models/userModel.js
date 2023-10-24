const mongoose = require('mongoose');
// const JWT = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    googleId: String,
    linkedinId: String,
    authType: String,
    firstName: String,
    lastName: String,
    email: String,
    avatar: {
        public_id: String,
        url: String,
    },
});

const User = mongoose.model('User', UserSchema)
module.exports = User