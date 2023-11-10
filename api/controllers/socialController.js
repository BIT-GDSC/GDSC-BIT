const passport = require('passport');
require('../config/googleAuth.js');

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
            const loginToken = user.getLoginToken();
            await user.save();

            return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(userData))}&registerToken=${registerToken}&loginToken=${loginToken}`);
        }
        else if (user.authType === 'login') {
            const loginToken = user.getLoginToken();
            await user.save();

            return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(userData))}&loginToken=${loginToken}`);
        }
    })(req, res, next);
}

exports.linkedinCallbackController = async function (req, res, next) {
    await passport.authenticate('linkedin', { session: false }, async function (err, user, info) {
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
            const loginToken = user.getLoginToken();
            await user.save();

            return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(userData))}&registerToken=${registerToken}&loginToken=${loginToken}`);
        }
        else if (user.authType === 'login') {
            const loginToken = user.getLoginToken();
            await user.save();

            return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(userData))}&loginToken=${loginToken}`);
        }
    })(req, res, next);
}