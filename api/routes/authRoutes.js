const express = require("express");
const {
    userLogin,
    loadUser,
    userRegisterCredential,
    userRegisterResendOTP,
    userRegisterVerifyOTP,
    userRegisterDetails,
    forgotEmailVerify,
    forgotResendOTP,
    forgotOTPVerify,
    forgotResetPassword
} = require("../controllers/authController.js");
const { isLoginToken, isRegisterToken, isForgotToken } = require("../middleware/auth.js");
const singleUpload = require("../middleware/multer.js");

const router = express.Router();

router.post("/login", userLogin);
router.get("/load-user", isLoginToken, loadUser);

router.post("/register-credential", userRegisterCredential);
router.get("/register-resend-otp", isRegisterToken, userRegisterResendOTP);
router.get("/register-verify-otp", isRegisterToken, userRegisterVerifyOTP);
router.post("/register-details", isRegisterToken, singleUpload, userRegisterDetails);

router.post("/forgot-email-verify", forgotEmailVerify);
router.post("/forgot-resend-otp", forgotResendOTP);
router.get("/forgot-otp-verify", forgotOTPVerify);
router.post("/forgot-reset-password", isForgotToken, forgotResetPassword);

module.exports = router;