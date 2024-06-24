const express = require('express');
const router = express.Router();

const Item = require('../models/item');

router.post('/enterItems', (req,res) =>{
    const data = req.body;
    console.log(data);
    res.status(200).send({ message: 'Data received: ', receivedData: data });
})

module.exports = router;
