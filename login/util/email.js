const nodeMailer = require('nodemailer');
const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
});
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log(success);
        console.log('Server is ready to take messages');
    }
});
const sendEmail = async (mail) => {
    try {
        await transporter.sendMail(mail);
        return;
    }catch(err){
        throw err;
    }
};
module.exports = sendEmail;