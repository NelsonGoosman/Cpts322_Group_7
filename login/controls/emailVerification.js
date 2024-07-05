const User = require('../models/User');
const { sendOTP } = require('./otp');

const sendVerificationEmail = async ({ email, subject, message }) => {
    try {
        const existingUser = await User.findOneAndDelete({ email });
        if (!existingUser) {
            throw new Error("User with email not found!");
        }
        const otpInfo = {
            email,
            subject: "Email Verification",
            message: "Verify your email by entering the OTP below",
            duration: 1,
        };
        const createdOTP = await sendOTP(otpInfo);
        return createdOTP;
    }catch (err){
        throw err;
    }
};
module.exports = { sendVerificationEmail } ;