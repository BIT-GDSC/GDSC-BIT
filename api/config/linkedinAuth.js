const passport = require('passport');
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
const User = require('../models/userModel.js');
const cloudinary = require('cloudinary');

passport.use(
    new LinkedInStrategy(
        {
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/linkedin/callback`,
            scope: ["openid", "profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({
                    $or: [{ email: profile.emails[0].value }, { linkedinId: profile.id },]
                });

                if (!user) {
                    const imageUpload = await cloudinary.v2.uploader.upload(profile.photos[0].value, { folder: "BIT/Account" });
                    user = await User.create({
                        linkedinId: profile.id,
                        authType: "register",
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        avatar: {
                            public_id: imageUpload.public_id,
                            url: imageUpload.secure_url,
                        }
                    });

                    return done(null, user);
                }

                user = await User.findByIdAndUpdate(user._id, {
                    authType: "login"
                });
                return done(null, user);
            }
            catch (error) {
                return done(error);
            }
        }
    )
);

// scope: ["openid", "profile", "email", "r_emailaddress", "r_liteprofile"],
            
// passport.serializeUser((user, done) => {
//     const serializedUser = {
//         id: user.id,
//     };
//     done(null, serializedUser);
// });

// passport.deserializeUser(async (serializedUser, done) => {
//     try {
//         const user = await User.findById(serializedUser.id);
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// });