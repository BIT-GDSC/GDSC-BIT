const User = require("../models/userModel.js");
const JWT = require("jsonwebtoken");

const isLoginToken = async (req, res, next) => {
    const loginToken = req.headers["login_token"];

    if (!loginToken) {
        return res.status(400).json({
            success: false,
            msg: "Session expired... Try again!",
        });
    }

    const checkToken = await User.findOne({ jwtLoginToken: loginToken });

    if (checkToken === null) {
        return res.status(400).json({
            success: false,
            msg: "Invalid Token!",
        });
    }

    const payload = JWT.verify(loginToken, process.env.JWT_SECRET);

    req.user = await User.findById(payload.userId);
    if (!req.user.isVerified) {
        return res.status(400).json({
            success: false,
            msg: "You are not authorized to perform this action!",
        });
    }

    next();
};

const isRegisterToken = async (req, res, next) => {
    const registerToken = req.headers["register_token"];

    if (!registerToken) {
        return res.status(400).json({
            success: false,
            msg: "Session expired... Try again!",
        });
    }

    const checkToken = await User.findOne({ jwtRegisterToken: registerToken });

    if (checkToken === null) {
        return res.status(400).json({
            success: false,
            msg: "Invalid Token!",
        });
    }

    const payload = JWT.verify(registerToken, process.env.JWT_SECRET);

    req.user = await User.findById(payload.userId);

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

module.exports = { isLoginToken, isRegisterToken, isForgotToken };