const passport = require('passport');
require('../config/googleAuth.js');
const axios = require('axios');
const User = require('../models/userModel.js');
const cloudinary = require('cloudinary');

exports.googleCallbackController = async function (req, res, next) {
    await passport.authenticate('google', { session: false }, async function (err, user, info) {
        if (err) {
            console.error(err);
            return res.redirect(`${process.env.FRONTEND_URL}/auth?error=${encodeURIComponent(err.message)}`);
        }
        if (!user) {
            return res.redirect(`${process.env.FRONTEND_URL}/auth?error=User not found`);
        }

        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: {
                public_id: user.avatar.public_id,
                url: user.avatar.url,
            }
        }

        if (user.authType === 'register') {
            const registerToken = user.getRegisterToken();
            await user.save();

            return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(userData))}&registerToken=${registerToken}`);
        }
        else if (user.authType === 'login') {
            const loginToken = user.getLoginToken();
            await user.save();

            return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(userData))}&loginToken=${loginToken}`);
        }
    })(req, res, next);
}

exports.twitterCallbackController = async function (req, res, next) {
    await passport.authenticate('twitter', { session: false }, async function (err, user, info) {
        if (err) {
            console.error(err);
            return res.redirect(`${process.env.FRONTEND_URL}/auth?error=${encodeURIComponent(err.message)}`);
        }
        if (!user) {
            return res.redirect(`${process.env.FRONTEND_URL}/auth?error=User not found`);
        }

        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: {
                public_id: user.avatar.public_id,
                url: user.avatar.url,
            }
        }

        if (user.authType === 'register') {
            const registerToken = user.getRegisterToken();
            await user.save();

            return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(userData))}&registerToken=${registerToken}`);
        }
        else if (user.authType === 'login') {
            const loginToken = user.getLoginToken();
            await user.save();

            return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(userData))}&loginToken=${loginToken}`);
        }
    })(req, res, next);
}

exports.linkedinCallbackController = async function (req, res) {
    const code = req.query.code;
    const client_id = process.env.LINKEDIN_CLIENT_ID;
    const client_secret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirect_uri = `${process.env.BACKEND_URL}/api/auth/linkedin/callback`;

    let access_token, user_info;
    const access_token_url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`;
    const user_info_url = `https://api.linkedin.com/v2/userinfo`;

    try {
        const response = await axios.post(access_token_url);
        access_token = response.data.access_token;

        const userResponse = await axios.get(user_info_url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            timeout: 5000
        });
        user_info = userResponse.data;
    }
    catch (error) {
        console.log(error);
    };

    try {
        let user = await User.findOne({
            $or: [{ email: user_info.email }, { linkedinId: user_info.sub },]
        });

        if (!user) {
            const imageUpload = await cloudinary.v2.uploader.upload(user_info.picture, { folder: "BIT/Account" });
            user = await User.create({
                linkedinId: user_info.sub,
                authType: "register",
                firstName: user_info.given_name,
                lastName: user_info.family_name,
                email: user_info.email,
                avatar: {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url,
                }
            });
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: {
                    public_id: user.avatar.public_id,
                    url: user.avatar.url,
                }
            }

            const registerToken = user.getRegisterToken();
            await user.save();
            return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(userData))}&registerToken=${registerToken}`);
        }

        user = await User.findByIdAndUpdate(user._id, {
            authType: "login"
        });
        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: {
                public_id: user.avatar.public_id,
                url: user.avatar.url,
            }
        }

        const loginToken = user.getLoginToken();
        await user.save();
        return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(userData))}&loginToken=${loginToken}`);
    }
    catch (error) {
        console.log(error);
    }
}