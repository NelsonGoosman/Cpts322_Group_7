const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OTPSchema = new Schema({
    email: { type: String, unique: true },
    otp: String,
    created_on: { type: Date, default: Date.now },
    expires_on: { type: Date, default: Date.now + 60000 },
});
const OTP = mongoose.model('OTP', OTPSchema);

module.exports = OTP;