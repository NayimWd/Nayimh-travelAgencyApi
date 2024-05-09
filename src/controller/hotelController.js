const hotelModel = require("../models/hotelModel/hotelModel");

// create
exports.createHotel = (req, res) => {
	let newHotel = req.body;

	hotelModel
		.create(newHotel)
		.then((result) => {
			if (result) {
				res.status(201).json({ status: "New Hotel Listed!", data: result });
			} else {
				res.status(201).json({ status: "Invalid Data Model!", data: result });
			}
		})
		.catch((err) => {
			res
				.status(400)
				.json({ status: "something went wrong on adding hotel", data: err });
		});
};
// update
exports.updateHotel = (req, res) => {
    const id = req.params?.id;
    const reqBody = req.body;
    const options = { new: true };

    hotelModel.findByIdAndUpdate(id, reqBody, options)
        .then((result) => {
            if (result) {
                res.status(200).json({ status: "Hotel Data Updated!", data: result });
            } else {
                res.status(404).json({ status: "Update Failed! Invalid data model" });
            }
        })
        .catch((err) => {
            res.status(400).json({ status: "Something went wrong in updating this hotel", error: err });
        });
};
// delete
// get all
exports.getAllHotels = (req, res) => {
	hotelModel
		.find()
		.then((result) => {
			if (result) {
				res.status(200).json({ status: "All hotels found!", data: result });
			} else {
				res.status(404).json({ status: "Hotel not found" });
			}
		})
		.catch((err) => {
			res
				.status(500)
				.json({ status: "somthing error in finding hotels", data: err });
		});
};
// get single hotel
exports.getSingleHotel = (req, res) => {
	const hotelId = req.params?.id;

	hotelModel
		.findById(hotelId)
		.then((result) => {
			if (result) {
				res.status(200).json({ status: "Hotel found!", data: result });
			} else {
				res.status(404).json({ status: "Hotel not found" });
			}
		})
		.catch((err) => {
			res
				.status(500)
				.json({
					status: "Something went wrong in finding this hotel",
					error: err,
				});
		});
};
// get hotel by filter
// get hotel stats
