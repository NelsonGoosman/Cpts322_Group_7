const express = require('express');
const router = express.Router();
const { sendVerificationEmail, verifyEmail } = require('../controls/emailVerification');

router.post('/verify', async (req, res) => {
    try {
        let { email, otp } = req.body;
        if (!(email && otp)) {
            throw new Error("OTP info is required!");
        }

        await verifyEmail({ email, otp });
        res.status(200).json({email, verified: true});
    }catch (err){
        throw err;
    }
});

router.post('/', async (req,res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new Error("Email is required!");
        }
        const emailVerification = await sendVerificationEmail({ email });
        res.status(200).json(emailVerification);
    }catch (err){
        throw err;
    }
});
module.exports = router;