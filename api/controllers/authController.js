const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');

exports.userRegisterCredential = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                msg: "User already exists!",
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            email,
            password: encryptedPassword
        });

        res.status(200).json({
            success: true,
            user,
            msg: "An OTP has been sent to your email",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error
        });
    }
}

exports.userRegisterVerifyOTP = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            msg: "User register verify otp route",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error
        });
    }
}

exports.userRegisterDetails = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            msg: "User register verify otp route",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error
        });
    }
}

exports.userLogin = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            msg: "User login route",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            msg: error
        });
    }
}