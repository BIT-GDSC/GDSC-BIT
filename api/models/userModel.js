const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    googleId: String,
    linkedinId: String,
    authType: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    avatar: {
        public_id: String,
        url: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    registerOTP: String,
    forgotOTP: String,
    otpCreatedAt: Date,
    jwtForgotToken: String,
    jwtRegisterToken: String,
    jwtLoginToken: String,
    joinedOn: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.methods.comparePassword = async function (enteredPasssword) {
    return bcrypt.compare(enteredPasssword, this.password);
};

UserSchema.methods.getLoginToken = function () {
    const loginToken = JWT.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    );
    this.jwtLoginToken = loginToken;
    return loginToken;
};

UserSchema.methods.getRegisterToken = function () {
    const registerToken = JWT.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    );
    this.jwtRegisterToken = registerToken;
    return registerToken;
};

UserSchema.methods.getForgotToken = function () {
    const forgotToken = JWT.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE,
        }
    );
    this.jwtForgotToken = forgotToken;
    return forgotToken;
};

const User = mongoose.model('User', UserSchema)
module.exports = User