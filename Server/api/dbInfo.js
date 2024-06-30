const express = require('express');
const router = express.Router();

const Item = require('../models/item');

const getAllDates = async () => {
    try {
        const items = await Item.find(); 
        const dates = items.map(item => item.date); 
        console.log(dates);
        return dates;
    } catch (err) {
        console.error('Error fetching dates:', err);
        throw err;
    }
};

const getAverageCost = async () => {
    try {
       
    } catch (err) {
        console.error('Error fetching dates:', err);
        throw err;
    }
};

const getNumItems = async () => {
    try {
       
    } catch (err) {
        console.error('Error fetching dates:', err);
        throw err;
    }
};

const getDonaters = async () => {
    try {
       
    } catch (err) {
        console.error('Error fetching dates:', err);
        throw err;
    }
};

router.get('/expirationDates', async (req, res) => {
    try {
        const dates = await getAllDates();
        res.status(200).json(dates);
        console.log(dates);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching dates.' });
    }
});

module.exports = router;