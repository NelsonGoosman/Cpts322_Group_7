require('./config/dataBase');
const bodyParser = require('express').json; //npm i express mongoose body-parser dotenv bcrypt && npm i --save-dev nodemon
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const UserRouter = require('./api/User');
const OTPRouter = require('./api/otp');
const EmailVerificationRouter = require('./api/emailVerification');


app.use(bodyParser());
app.use(cors());
app.use('/user', UserRouter);
app.use('/otp', OTPRouter);
app.use('/emailVerify', EmailVerificationRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
