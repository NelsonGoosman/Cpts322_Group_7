const OTP = require('../models/otpSchema');
const User = require('../models/user');
const { generateOTP } = require('./../util/generateOTP');
const sendEmail = require('./../util/email');
const AUTH_EMAIL = process.env;
const { dataHash, verifyHash } = require('./../util/dataHash');

const verifyOTP = async ({ email, otp }) => {
    try {
        if (!(email && otp)) {
            throw new Error("Invalid value for email, otp.");
        }
        const matchOTP = await OTP.findOne({ email });

        if (!matchOTP) {
            throw new Error("OTP not found!");
        }
        const { expires_on } = matchOTP;

        if (expires_on < Date.now()) {
            await OTP.deleteOne({ email });
            throw new Error("OTP expired!");
        }

        const hashedOTP = matchOTP.otp;
        const validOTP = await verifyHash(otp, hashedOTP);
        return validOTP;


    }catch (err){
        throw err;
    }
}

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
        if (!(email && subject && message)) {
            throw new Error("Empty input!!");
        }
        await OTP.deleteOne({email});

        let generatedOTP = await generateOTP();
        generatedOTP = generatedOTP.toString();

        const mail = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p><p style="color:red;font-size:24px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This OTP will expire in <b>${duration} hour(s)</b>.</p>`,
        };
        await sendEmail(mail);

        const hashedOTP = await dataHash(generatedOTP);
        const newOTP = new OTP({
            email,
            otp: hashedOTP,
            created_on: Date.now(),
            expires_on: Date.now() + 3600000 * +duration,
        });
        const OTPrec = await newOTP.save();
        return OTPrec;

    } catch (err) {
        throw err;
    }
};
const deleteOTP = async (email) => {
    try {
        await OTP.deleteOne({ email })
    }catch(err){
        throw err;
    }
};

module.exports = { sendOTP, verifyOTP, deleteOTP };
