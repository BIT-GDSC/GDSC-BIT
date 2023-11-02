const express = require("express");
const {
    userRegisterCredential,
    userRegisterResendOTP,
    userRegisterVerifyOTP,
    userRegisterDetails,
    userLogin,
    loadUser
} = require("../controllers/authController.js");
const { isRegisteredUser, isVerifiedUser } = require("../middleware/auth.js");
const singleUpload = require("../middleware/multer.js");

const router = express.Router();

router.post("/register-credential", userRegisterCredential);
router.get("/register-resend-otp", isRegisteredUser, userRegisterResendOTP);
router.get("/register-verify-otp", isRegisteredUser, userRegisterVerifyOTP);
router.post("/register-details", isRegisteredUser, singleUpload, userRegisterDetails);
router.post("/login", userLogin);
router.get("/load-user", isVerifiedUser, loadUser);

module.exports = router;