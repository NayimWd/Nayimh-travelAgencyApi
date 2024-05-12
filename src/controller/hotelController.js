// this hotel controller created with old pattern for practice purposes on other controller I followed new pattern 
const hotelModel = require("../models/hotelModel/hotelModel");

// create
exports.createHotel = async (req, res) => {
	let newHotel = req.body;

	hotelModel
		.create(newHotel)
		.then((result) => {
			if (result) {
				res.status(201).json({ status: "Success", message: "New Hotel Listed!", data: result });
			} else {
				res.status(201).json({ status: "Error", message: "Invalid Data Model!", data: result });
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
				res.status(200).json({ status: "Success", message: "Hotel Data Updated!", data: result });
			} else {
				res.status(404).json({ status: "Error", message: "Update Failed! Invalid data model" });
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
                res.status(200).json({status: "Success", message: "Hotel deleted successfully", data: deletedHotel });
            } else {
                res.status(404).json({ status: "Error", message: "Hotel not found" });
            }
        })
        .catch((err) => {
            console.error('Error deleting hotel:', err);
            res.status(500).json({ status: "Error", message: "Something went wrong in deleting the hotel", error: err });
        });
};

// get all
exports.getAllHotels = async (req, res) => {
    try {
        const { location, name, type, sort, limit, page } = req.query;
        const query = {};

        // Apply search filters
        if (location) query['details.place'] = location;
        if (name) query.name = { $regex: name, $options: 'i' };
        if (type) query.type = type;

        // Apply sorting options
        const sortOptions = {};
        if (sort === 'priceLowToHigh') {
            sortOptions.minPrice = 1;
        } else if (sort === 'priceHighToLow') {
            sortOptions.maxPrice = -1;
        } else if (sort === 'ratingsHighToLow') {
            sortOptions.ratings = -1;
        } else if (sort === 'ratingsLowToHigh') {
            sortOptions.ratings = 1;
        }

        // Apply pagination
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * pageSize;

        // Retrieve hotels based on filters, sorting, and pagination
        const hotels = await hotelModel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);

        res.status(200).json({ status: "Success", message: "Hotels Found successfully", data: hotels });
    } catch (error) {
        console.error("Error retrieving hotels:", error);
        res.status(500).json({ status: "Error", message: "Something went wrong in Finding hotels", error: error });
    }
};

// get hotel by features
exports.getHotelsByFeatured = async (req, res) => {
	try {
        // Find hotels with featured set to true
        const featuredHotels = await hotelModel.find({featured: "true"});
		
        // Check if any hotels were found
        if (featuredHotels.length === 0) {
            return res.status(404).json({
                status: 'Error',
                message: 'No featured hotels found',
            });
        }

        // Return the found hotels
        res.status(200).json({
            status: 'Success',
            message: 'Featured hotels found',
            data: featuredHotels,
        });
    } catch (error) {
   
        res.status(500).json({
            status: 'Error',
            message: 'Something went wrong while retrieving featured hotels',
            error: error.message,
        });
    }
};

// get single hotel
exports.getSingleHotel = (req, res) => {
	const hotelId = req.params?.id;

	hotelModel
		.findById(hotelId)
		.then((result) => {
			if (result) {
				res.status(200).json({status: "Success", message: "Hotel found!", data: result });
			} else {
				res.status(404).json({ status: "NotFound", message: "Hotel not found" });
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
