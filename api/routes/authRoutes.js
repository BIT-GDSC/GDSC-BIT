const express = require("express");
const {
    userRegisterCredential,
    userRegisterVerifyOTP,
    userRegisterDetails,
    userLogin
} = require("../controllers/authController.js");
const router = express.Router();

router.post("/register-credential", userRegisterCredential);
router.get("/register-verify-otp", userRegisterVerifyOTP);
router.get("/register-details", userRegisterDetails);
router.post("/login", userLogin);

module.exports = router;