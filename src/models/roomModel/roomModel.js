const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
	title: {
		String,
		required: true,
	},
    price: {
		String,
		required: true,
	},
    maxPeople: {
		String,
		required: true,
	},
    description: {
		String,
		required: true,
	},
    roomNumbers: [{
       number: Number,
       unAvilableDates: [{
        type: [Date]
       }]
    }]

}, {timestamps: true});

const roomModel = mongoose.model("rooms", RoomSchema);

module.exports = roomModel;
