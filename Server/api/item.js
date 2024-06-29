const express = require('express');
const router = express.Router();

const Item = require('../models/item');

router.post('/enterItems', async (req, res) => {
    const items = req.body; // Assuming req.body.items is an array of item objects

    // if (!items || !Array.isArray(items)) {
    //     return res.status(400).send({ message: 'Invalid data format' });
    // }
    
    console.log(req.body);
    try {
        for (const data of items) {
            const newItem = new Item({
                name: data.name,
                description: data.description,
                expiration: data.expiration,
                cost: data.price,
                donatedBy: data.donatedBy
            });

            await newItem.save();
        }

        res.status(200).send({ message: 'Data received and saved successfully' });
    } catch (error) {
        console.error('Error saving items:', error);
        res.status(500).send({ message: 'Error saving items' });
    }
});

module.exports = router;
