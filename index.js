const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { readdirSync } = require('fs');
const { v2 } = require("cloudinary");
const passport = require('passport');
require('./api/config/googleAuth.js');
const connectDatabase = require('./api/config/connectDatabase.js');

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(passport.initialize());

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Backend Routes
readdirSync("./api/routes").map((r) => app.use("/api/", require('./api/routes/' + r)));
app.get('/api/status', (req, res) => {
    res.status(201).json({
        success: true,
        msg: "Server Running",
    });
});

// Google authentication route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback route
app.get('/auth/google/callback', function (req, res, next) {
    passport.authenticate('google', { session: false }, function (err, user, info) {
        if (err) {
            console.error(err);
            return res.redirect(`${process.env.FRONTEND_URL}/auth?error=${encodeURIComponent(err.message)}`);
        }
        if (!user) {
            return res.redirect(`${process.env.FRONTEND_URL}/auth?error=User not found`);
        }
        return res.redirect(`${process.env.FRONTEND_URL}/auth?type=${user.authType}&response=${encodeURIComponent(JSON.stringify(user))}`);
    })(req, res, next);
});

// Frontend Routes
app.use(express.static(path.resolve(__dirname, 'client', 'dist')))
app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'client', 'dist', 'index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    )
});

const PORT = process.env.PORT || 5001;
connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to PORT => ${PORT}`);
    })
});