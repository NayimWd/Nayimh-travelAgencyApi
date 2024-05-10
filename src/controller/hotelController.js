// this hotel controller created with old pattern for practice purposes on other controller I followed new pattern 
const hotelModel = require("../models/hotelModel/hotelModel");

// create
exports.createHotel = async (req, res) => {
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
			res.status(400).json({
				status: "Error",
				message: "something went wrong on adding hotel",
				data: err,
			});
		});
};
// update
exports.updateHotel = (req, res) => {
	const id = req.params?.id;
	const reqBody = req.body;
	const options = { new: true };

	hotelModel
		.findByIdAndUpdate(id, { $set: reqBody }, options)
		.then((result) => {
			if (result) {
				res.status(200).json({ status: "Hotel Data Updated!", data: result });
			} else {
				res.status(404).json({ status: "Update Failed! Invalid data model" });
			}
		})
		.catch((err) => {
			res.status(400).json({
				status: "Error",
				message: "Something went wrong in updating this hotel",
				error: err,
			});
		});
};

// delete
exports.deleteHotel = (req, res) => {
    const hotelId = req.params.id;

    hotelModel.findByIdAndDelete(hotelId)
        .then((deletedHotel) => {
            if (deletedHotel) {
                res.status(200).json({ status: "Hotel deleted successfully", data: deletedHotel });
            } else {
                res.status(404).json({ status: "Hotel not found" });
            }
        })
        .catch((err) => {
            console.error('Error deleting hotel:', err);
            res.status(500).json({ status: "Error", message: "Something went wrong in deleting the hotel", error: err });
        });
};

// get all
exports.getAllHotels = (req, res) => {
	let search = req.query.search || ""; // Default search is empty string
	let cityName = req.query.city || ""; // City name filter
	let limit = parseInt(parseInt(req.query.limit)) || 10;
	let sort = req.query.sort || "";

	// Construct the search filter based on the provided search criteria
	let searchFilter = {};
	if (search) {
		searchFilter.name = { $regex: search, $options: "i" };
	}

	// Construct the city filter based on the provided city name
	let cityFilter = {};
	if (cityName) {
		cityFilter.location = cityName;
	}

	// Validate and construct the sort object based on the provided sorting criteria
	let sortOptions = {};
	if (sort) {
		switch (sort) {
			case "priceLowToHigh":
				sortOptions.price = 1; // Sort by price in ascending order
				break;
			case "priceHighToLow":
				sortOptions.price = -1; // Sort by price in descending order
				break;
			case "ratingsHighToLow":
				sortOptions.quality = -1; // Sort by ratings (quality) in descending order
				break;
			case "ratingsLowToHigh":
				sortOptions.quality = 1; // Sort by ratings (quality) in ascending order
				break;
			default:
				break;
		}
	}

	hotelModel
		.find({ ...searchFilter, ...cityFilter })
		.limit(limit)
		.sort(sortOptions)
		.then((result) => {
			if (result.length > 0) {
				res.status(200).json({
					status: "All hotels found!",
					message: `Showing ${result.length} hotels`,
					data: result,
				});
			} else {
				res.status(404).json({ status: "No Hotel found" });
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
			res.status(500).json({
				status: "Error",
				message: "something went wrong fetching hotels",
				error: err,
			});
		});
};

// get hotel stats
exports.getHotelStats = async (req, res) => {
	try {
		const totalHotels = await hotelModel.countDocuments();

		const hotelsByCity = await hotelModel.aggregate([
			{ $group: { _id: "$location", count: { $sum: 1 } } },
		]);

		const hotelsByQuality = await hotelModel.aggregate([
			{ $group: { _id: "$quality", count: { $sum: 1 } } },
		]);

		const totalFeaturedHotels = await hotelModel.countDocuments({
			featured: true,
		});

		res.status(200).json({
			status: "Success",
			data: {
				totalHotels,
				hotelsByCity,
				hotelsByQuality,
				totalFeaturedHotels,
			},
		});
	} catch (error) {
		console.error("Error fetching hotel stats:", error);
		res.status(500).json({
			status: "Error",
			message: "Something went wrong in fetching hotel stats",
			error: error,
		});
	}
};
