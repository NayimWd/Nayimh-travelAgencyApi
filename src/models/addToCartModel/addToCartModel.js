const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    itemId: {
        type : String,
        required: true
    },
    city: {
        type : String,
        required: true
    }
    
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;