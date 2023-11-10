const express = require("express");
const {
    userRegisterCredential,
    userRegisterResendOTP,
    userRegisterVerifyOTP,
    userRegisterDetails,
    userLogin,
    loadUser,
    forgotEmailVerify,
    forgotResendOTP,
    forgotOTPVerify,
    forgotResetPassword
} = require("../controllers/authController.js");
const { isRegisteredUser, isVerifiedUser, isForgotToken } = require("../middleware/auth.js");
const singleUpload = require("../middleware/multer.js");

const router = express.Router();

router.post("/register-credential", userRegisterCredential);
router.get("/register-resend-otp", isRegisteredUser, userRegisterResendOTP);
router.get("/register-verify-otp", isRegisteredUser, userRegisterVerifyOTP);
router.post("/register-details", isRegisteredUser, singleUpload, userRegisterDetails);

router.post("/login", userLogin);
router.get("/load-user", isVerifiedUser, loadUser);

router.post("/forgot-email-verify", forgotEmailVerify);
router.post("/forgot-resend-otp", forgotResendOTP);
router.get("/forgot-otp-verify", forgotOTPVerify);
router.post("/forgot-reset-password", isForgotToken, forgotResetPassword);

module.exports = router;