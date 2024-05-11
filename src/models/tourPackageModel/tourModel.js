const mongoose = require('mongoose');

const tourModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    location: {
        place: String,
        around: String
    },
    timing: {
        duration: String,
        time: String
    },
    included: {
        pickup: String,
        accommodation: String,
        meal: String
    },
    description: String,
    additionalInfo: {
        instantbooking: String,
        requirement: String 
    },
    seat: {
        minimum: Number,
        max: Number
    },
    price: String,
    image: [String],
    timeSlot: [Date],
    featured: {
        type: Boolean,
        default: false
    }
});


const TourModel = mongoose.model("Tours", tourModel);

module.exports = TourModel;