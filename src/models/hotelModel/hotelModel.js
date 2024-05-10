const mongoose = require("mongoose");


const HotelSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    details: {
        place: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        }
    },
    nearby: {
        first: String,
        second: String,
        third: String
    },
    rooms: String, // You might want to specify a type here if you have a specific schema for rooms
    description: {
        numberOfRoom: String,
        numberOfFloor: String,
        overview: String
    },
    photo: [String],
    facilities: {
        bathroom: String,
        disability: String,
        pickup: String,
        parking: String,
        elevator: String,
        coupleFriently: String
    },
    meal: {
        breakfast: String,
        Lunch: String,
        dinner: String
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: Number,
    personCount: String,
    quality: {type: Number, required: true},
    ratings: Number,
    phone: String,
    email: String,
    featured: {
        type: Boolean,
        default: false
    }
});


const hotelModel = mongoose.model("Hotels", HotelSchema);

module.exports = hotelModel;
