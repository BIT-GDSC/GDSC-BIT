const User = require("../models/userModel.js");
const JWT = require("jsonwebtoken");

const isRegisteredUser = async (req, res, next) => {
    const token = req.headers["token"];

    if (!token) {
        return res.status(400).json({
            success: false,
            msg: "Session expired... Login and try again!",
        });
    }

    const checkToken = await User.findOne({ jwtLoginToken: token });

    if (checkToken === null) {
        return res.status(400).json({
            success: false,
            msg: "Invalid Token!",
        });
    }

    const payload = JWT.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(payload.userId);

    next();
};

const isVerifiedUser = async (req, res, next) => {
    const token = req.headers["token"];

    if (!token) {
        return res.status(400).json({
            success: false,
            msg: "Session expired... Login and try again!",
        });
    }

    const checkToken = await User.findOne({ jwtLoginToken: token });

    if (checkToken === null) {
        return res.status(400).json({
            success: false,
            msg: "Invalid Token!",
        });
    }

    const payload = JWT.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(payload.userId);
    if (!req.user.isVerified) {
        return res.status(400).json({
            success: false,
            msg: "You are not authorized to perform this action!",
        });
    }

    next();
};

const isForgotToken = async (req, res, next) => {
    const forgotToken = req.headers["forgot_token"];

    if (!forgotToken) {
        return res.status(400).json({
            success: false,
            msg: "Session expired... Try again!",
        });
    }

    const checkToken = await User.findOne({ jwtForgotToken: forgotToken });

    if (checkToken === null) {
        return res.status(400).json({
            success: false,
            msg: "Invalid Token!",
        });
    }

    const payload = JWT.verify(forgotToken, process.env.JWT_SECRET);

    req.user = await User.findById(payload.userId);
    if (!req.user.isVerified) {
        return res.status(400).json({
            success: false,
            msg: "You are not authorized to perform this action!",
        });
    }

    next();
};

module.exports = { isRegisteredUser, isVerifiedUser, isForgotToken };