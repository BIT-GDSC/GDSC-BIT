const passport = require('passport');
const { Strategy: TwitterStrategy } = require('passport-twitter');
const User = require('../models/userModel.js');
const cloudinary = require('cloudinary');

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/twitter/callback`,
            includeEmail: true
        },
        async (token, tokenSecret, profile, done) => {
            try {
                let user = await User.findOne({
                    $or: [{ email: profile.emails[0].value }, { twitterId: profile.id }]
                });

                if (!user) {
                    const imageUpload = await cloudinary.v2.uploader.upload(profile.photos[0].value, { folder: "BIT/Account" });
                    user = await User.create({
                        googleId: profile.id,
                        authType: "register",
                        firstName: profile.displayName,
                        lastName: "",
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
                done(error, false);
            }
        }
    )
);