const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { readdirSync } = require('fs');
const session = require('express-session')
const passport = require('passport');
require('./api/config/googleAuth.js');
require('./api/config/linkedinAuth.js');
const {
    googleCallbackController,
    linkedinCallbackController
} = require('./api/controllers/socialController.js');
const { v2 } = require("cloudinary");
const connectDatabase = require('./api/config/connectDatabase.js');

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API Routes
readdirSync("./api/routes").map((r) => app.use("/api/", require('./api/routes/' + r)));
app.get('/api/status', (req, res) => {
    res.status(201).json({
        success: true,
        msg: "Server Running",
    });
});

// Authentication API routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', googleCallbackController);
app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['openid', 'profile', 'email'] }));
app.get('/auth/linkedin/callback', linkedinCallbackController);

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