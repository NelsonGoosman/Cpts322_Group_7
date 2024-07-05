const express = require('express');
const router = express.Router();
const { sendVerificationEmail } = require('../controls/emailVerification');

router.post('/', async (req,res) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new Error("Email is required!");
        }
        const emailVerification = await sendVerificationEmail({ email });
        res.status(200).send(emailVerification);
    }catch (err){
        throw err;
    }
});
module.exports = router;