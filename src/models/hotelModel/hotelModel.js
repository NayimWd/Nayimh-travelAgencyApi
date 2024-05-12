const mongoose = require("mongoose");
const { type } = require("os");


const HotelSchema =  new mongoose.Schema({
    title: String,
    type: String,
    city: String,
    details: {
        place: String,
        area: String
    },
    nearby: {
        first: String,
        second: String,
        third: String
    },
    rooms: [], 
    description: {
        numberOfRoom: String,
        numberOfFloor: String,
        overview: String
    },
    image: [String],
    facilities: {
        bathroom: String,
        disability: String,
        pickup: String,
        parking: String,
        elevator: String,
        coupleFriendly: String // Corrected the typo here
    },
    meal: {
        breakfast: String,
        lunch: String, // Corrected the casing here
        dinner: String
    },
    maxPrice: {
        type: String,
        required: true
    },
    minPrice: {
        type: String,
        required: true
    },
    quality: {
        type: Number,
        min: 0,
        max: 5
    },
    ratings: Number,
    phone: String,
    email: String,
    featured: {
        type: String,
        default : false
    }
});



const hotelModel = mongoose.model("Hotels", HotelSchema);

module.exports = hotelModel;
