const mongoose = require("mongoose");
const { regexPatterns } = require("../../utils/helper");

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: regexPatterns.email,
		},
		password: {
			type: String,
			required: true,
			match: regexPatterns.password,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		phoneNumber: {
			type: String,
			default: ""
		  },
		photoUrl: {
			type: String,
			default: "",
		},
		address: {
			type: String,
			default: "",
		}
	},
	{ timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
