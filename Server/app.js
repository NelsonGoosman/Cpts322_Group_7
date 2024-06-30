require('./config/dataBase');
const bodyParser = require('express').json; //npm i express mongoose body-parser dotenv bcrypt && npm i --save-dev nodemon
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const UserRouter = require('./api/user');
const ItemRouter = require('./api/item')
const InfoRouter = require('./api/dbInfo')
app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }));

//app.use(bodyParser());
app.use(express.json())

app.use('/user', UserRouter);
app.use('/item', ItemRouter);
app.use('/dbInfo', InfoRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

