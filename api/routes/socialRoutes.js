const express = require("express");
const passport = require('passport');
require('../config/googleAuth.js');
require('../config/linkedinAuth.js');
const { googleCallbackController, linkedinCallbackController } = require("../controllers/socialController");
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', googleCallbackController);
router.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['openid', 'profile', 'email'] }));
router.get('/auth/linkedin/callback', linkedinCallbackController);

module.exports = router;