const express = require("express");
const {
    userRegisterCredential,
    userRegisterResendOTP,
    userRegisterVerifyOTP,
    userRegisterDetails,
    userLogin
} = require("../controllers/authController.js");
const isAuthenticatedUser = require("../middleware/auth.js");

const router = express.Router();

router.post("/register-credential", userRegisterCredential);
router.get("/register-resend-otp", isAuthenticatedUser, userRegisterResendOTP);
router.get("/register-verify-otp", userRegisterVerifyOTP);
router.get("/register-details", userRegisterDetails);
router.post("/login", userLogin);

module.exports = router;