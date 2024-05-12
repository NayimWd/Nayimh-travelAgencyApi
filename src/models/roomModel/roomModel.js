const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
	id: {
        type: String, // or whatever type you want to use for the _id field
        required: true,
        unique: true
    },
	title: {
		type: String,
		required: true
	},
    price: {
		type: String,
		required: true
	},
    maxPeople: {
		type: String,
		required: true
	},
    description: {
		type: String,
		required: true
	},
    roomNumbers: [{
       number: Number,
       unAvilableDates: {
        type: [Date]
       }
    }]

}, {timestamps: true});

const roomModel = mongoose.model("rooms", RoomSchema);

module.exports = roomModel;
