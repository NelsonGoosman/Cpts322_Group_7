const OTP = require('../models/otpSchema');
const { generateOTP } = require('./../util/generateOTP');
const sendEmail = require('./../util/email');
const AUTH_EMAIL = process.env;
const dataHash = require('./../util/dataHash');

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
            created_on: new Date,
            expires_on: new Date + 3600000 * +duration,
        });
        const OTPrec = await newOTP.save();
        return OTPrec;

    } catch (err) {
        throw err;
    }
};
module.exports = { sendOTP };