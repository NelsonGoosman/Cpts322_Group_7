const User = require('../models/User');
const { sendOTP, verifyOTP, deleteOTP } = require('./otp');

const verifyEmail = async ({email, otp}) => {
    try {
        const validOTP = await verifyOTP({ email, otp });
        if (!validOTP) {
            throw new Error("Invalid OTP!");
        }

        await User.updateOne({ email }, { verified: true });
        await deleteOTP(email);
        return;
    }catch (err){
        throw err;
    }
};

const sendVerificationEmail = async ({ email }) => {
    try {
        const existingUser = await User.findOne({ email });
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
module.exports = { sendVerificationEmail, verifyEmail } ;