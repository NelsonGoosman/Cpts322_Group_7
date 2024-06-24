const express = require('express');
const router = express.Router();

const Item = require('../models/item');

router.post('/enterItems', (req,res) =>{
    const data = req.body;
    console.log(data);
    res.status(200).send({ message: 'Data received:' });
    for (const item of items){
        const newItem = new Item({
            name: data.name,
            description: data.description,
            expiration: data.expiration,
            cost: data.price,
            donatedBy: data.donatedBy
        })
        newItem.save();
    }
})

module.exports = router;
