const socialToken = async (user) => {
    const token = user.getJWTToken();
    await user.save();
    return token;
};

module.exports = socialToken;