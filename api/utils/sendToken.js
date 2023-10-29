const sendToken = async (user, statusCode, msg, res) => {
    const token = user.getJWTToken();
    await user.save();
    res.status(statusCode).json({
        success: true,
        user,
        msg,
        token,
    });
};

module.exports = sendToken;