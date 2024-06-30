const express = require('express');
const router = express.Router();

const Item = require('../models/item');

const getAllDates = async () => {
    try {
        const items = await Item.find({}, 'expiration'); 
        const dates = items.map(item => item.expiration); 
        return dates;
    } catch (err) {
        console.error('Error fetching dates:', err);
        throw err;
    }
};

const getAverageCost = async () => {
    try {
        const items = await Item.find({}, 'cost'); 
        const totalCost = items.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return totalCost / items.length;
    } catch (err) {
        console.error('Error fetching average cost:', err);
        throw err;
    }
};

const getNumItems = async () => {
    try {
        const items = await Item.find({}); 
        return items.length;
    } catch (err) {
        console.error('Error fetching number of items:', err);
        throw err;
    }
};

const getDonaters = async () => {
    try {
        const donors = await Item.find({}, "donatedBy"); 
        noEmpty = donors.map(item => item.donatedBy);
        console.log(noEmpty);
        return noEmpty.filter(str => str !== '');
    } catch (err) {
        console.error('Error fetching donors:', err);
        throw err;
    }
};

router.get('/expirationDates', async (req, res) => {
    try {
        const dates = await getAllDates();
        res.status(200).json(dates.filter(str => str !== ''));
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching dates.' });
    }
});

router.get('/average', async (req, res) => {
    try {
        const avgCost = await getAverageCost();
        res.status(200).json(avgCost);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching average cost.' });
    }
});

router.get('/numItems', async (req, res) => {
    try {
        const numitems = await getNumItems();
        res.status(200).json(numitems);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while number of items.' });
    }
});

router.get('/donaters', async (req, res) => {
    try {
        const donors = await getDonaters();
        
        res.status(200).send(donors);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching donors.' });
    }
});
module.exports = router;