const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: String,
    description: String,
    expiration: String,
    cost: Number,
    donatedBy: String
})

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;