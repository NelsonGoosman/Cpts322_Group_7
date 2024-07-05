const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controls/otp');

router.post('/verify', async (req, res) => {
    try {
        let { email, otp } = req.body;

        const validOTP = await verifyOTP({ email, otp });
        res.status(200).send({ valid: validOTP });
    }catch (err){
        throw err;
    }
});


router.post('/', async (req,res) =>{
    try {
        let { email, subject, message, duration } = req.body;
        const createdOTP = await sendOTP({ email, subject, message, duration });
        res.status(200).send(createdOTP);
    }catch(err){
        res.status(400).send(err.message);
    }
});
module.exports = router;