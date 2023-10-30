const sendToken = async (sendUser, user, statusCode, msg, res) => {
    const token = user.getJWTToken();
    await user.save();
    res.status(statusCode).json({
        success: true,
        ...sendUser ? { user } : {},
        msg,
        token,
    });
};

module.exports = sendToken;