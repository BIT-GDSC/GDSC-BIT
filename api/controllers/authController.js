const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/sendToken.js');
const generateOTP = require('../utils/generateOTP.js');
const sendOTP = require('../mail/sendOTP.js');

exports.userRegisterCredential = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user && user.isVerified === true) {
            return res.status(400).json({
                success: false,
                msg: "User already exists!",
            });
        }
        
        const encryptedPassword = await bcrypt.hash(password, 10);
        const randomOTP = generateOTP(5);

        if (user && user.isVerified === false) {
            user = await User.findByIdAndUpdate(user._id, {
                email,
                password: encryptedPassword,
                registerOTP: randomOTP
            });
        }
        else {
            user = await User.create({
                email,
                password: encryptedPassword,
                registerOTP: randomOTP
            });
        }

        await sendOTP({
            email,
            subject: "Verify Account | GDSC Bengal Institute of Technology",
            message: `Here's your OTP: ${randomOTP}`
        });

        sendToken(user, 200, "An OTP has been sent to your email", res);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Something went wrong... Try again later!"
        });
    }
}

exports.userRegisterVerifyOTP = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            msg: "User register verify otp route",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            msg: "Something went wrong... Try again later!"
        });
    }
}

exports.userRegisterDetails = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            msg: "User register verify otp route",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            msg: "Something went wrong... Try again later!"
        });
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
            .select("+password")
            .where({ isVerified: true });

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "User is not registered!",
            });
        }

        if (user.password) {
            const isPasswordMatched = await user.comparePassword(password);

            if (!isPasswordMatched) {
                return res.status(400).json({
                    success: false,
                    msg: "Invalid credential!",
                });
            }
        }
        else if (user.googleId) {
            return res.status(200).json({
                success: true,
                msg: "Credentials associated with your Google account! Sign in with Google to proceed!",
            });
        }
        else if (user.linkedinId) {
            return res.status(200).json({
                success: true,
                msg: "Credentials associated with your LinkedIn account! Sign in with LinkedIn to proceed!",
            });
        }

        await sendToken(user, 201, "Login success!", res);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            msg: "Something went wrong... Try again later!"
        });
    }
}