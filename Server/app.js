require('./config/dataBase');
const bodyParser = require('express').json; //npm i express mongoose body-parser dotenv bcrypt && npm i --save-dev nodemon
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const UserRouter = require('./api/user');


app.use(bodyParser());

app.use('/user', UserRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})