const User = require("../models/userModel.js");
const JWT = require("jsonwebtoken");

const isAuthenticatedUser = async (req, res, next) => {
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

module.exports = isAuthenticatedUser;