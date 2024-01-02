const passport = require('passport');
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new LinkedInStrategy(
        {
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/linkedin/callback`,
            scope: ['openid', 'profile', 'email'],
            state: true,
        },
        function (req, accessToken, refreshToken, profile, done) {
            req.session.accessToken = accessToken;
            process.nextTick(function () {
                return done(null, profile);
            });
        }
    )
);