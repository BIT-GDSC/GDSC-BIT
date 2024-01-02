const express = require("express");
const passport = require('passport');
require('../config/googleAuth.js');
require('../config/twitterAuth.js');
require('../config/linkedinAuth.js');
const { googleCallbackController, twitterCallbackController, linkedinCallbackController } = require("../controllers/socialController");
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', googleCallbackController);
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', twitterCallbackController);
router.get('/auth/linkedin', passport.authenticate('linkedin'));
router.get('/auth/linkedin/callback', linkedinCallbackController);

module.exports = router;