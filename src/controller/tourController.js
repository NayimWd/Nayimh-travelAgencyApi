const TourModel = require("../models/tourPackageModel/tourModel");

// create tour package
exports.createTourPackage = async (req, res) => {
	try {
		const tourData = req.body;

		const newTourPackage = new TourModel(tourData);

		// saving new package to db
		const tour = await newTourPackage.save();

		res.status(201).json({
			status: "Success",
			message: "A new tour package created successfully",
			data: tour,
		});
	} catch (error) {
		res.status(500).json({
			status: "Error",
			message: "Something went wrong while creating the tour",
			error: error,
		});
	}
};
// update tour package
exports.updateTourPackage = async (req, res) => {
	try {
		const { id } = req.params;
		const tourData = req.body;

		// checking tour package exist or not
		const existPackage = await TourModel.findById(id);

		if (!existPackage) {
			return res
				.status(404)
				.json({ status: "Error", message: "Tour not found" });
		}

		// update tour
		const updateTour = await TourModel.findByIdAndDelete(id, tourData, {
			new: true,
		});

		res.status(200).json({
			status: "Success",
			message: "Tour Package Updated Successfully",
			data: updateTour,
		});
	} catch (error) {
		res.status(500).json({
			status: "Error",
			message: "Something went wrong in updating the tour",
			error: error,
		});
	}
};
// delete tour package
exports.deleteTourPackage = async (req, res) => {
	const { id } = req.params;

	const existTour = await TourModel.findById(id);

	if (!existTour) {
		return res.status(404).json({ status: "Error", message: "Tour not found" });
	}

	const deletedTour = await TourModel.findByIdAndDelete(existTour);

	res.status(200).json({
		status: "200",
		message: "This Tour Deleted Successfully",
		data: deletedTour,
	});
};
// get all tour tour package
exports.getAllTour = async (req, res) => {
	try {
		const { city, title, type, sort, limit, page } = req.query;
		const query = {};

		// Apply search filters
		if (city) query.city = city;
		if (title) query.title = { $regex: title, $options: "i" };
		if (type) query.type = type;

		// Apply sorting options
		const sortOptions = {};
		if (sort === "priceLowToHigh") {
			sortOptions.price = 1;
		} else if (sort === "priceHighToLow") {
			sortOptions.price = -1;
		}

		// Apply pagination
		const pageNumber = parseInt(page) || 1;
		const pageSize = parseInt(limit) || 10;
		const skip = (pageNumber - 1) * pageSize;

		// Retrieve tours based on filters, sorting, and pagination
		const tours = await TourModel.find(query)
			.sort(sortOptions)
			.skip(skip)
			.limit(pageSize);

		res
			.status(200)
			.json({
				status: "Success",
				message: "Tours retrieved successfully",
				data: tours,
			});
	} catch (error) {
		console.error("Error retrieving tours:", error);
		res
			.status(500)
			.json({
				status: "Error",
				message: "Something went wrong in retrieving tours",
				error: error,
			});
	}
};

// get tours by features
exports.getFeaturedTour = async (req, res) => {
	try {
		const featuredTour = await TourModel.find({featured: true});

		if(featuredTour.length === 0){
			return res.status(404).json({
				status: "Error",
				message: "Featured Tour package empty!"
			})
		}

		res.status(200).json({
			status: "Success",
			message: "Feature tour found successfully",
			data: featuredTour
		})

	} catch (error) {
		res.status(500).json({
            status: 'Error',
            message: 'Something went wrong while retrieving featured Tour package',
            error: error.message,
        });
	}
}

// get single tour tour package
exports.getSingleTourPackage = async (req, res) => {
	try {
		const tourId = req.params.id;

		// find package
		const package = await TourModel.findById(tourId);

		if (!package) {
			return res
				.status(404)
				.json({ status: "Error", message: "Tour package not found" });
		}

		res.status(200).json({
			status: "Success",
			message: "The Package Found Successfully",
			data: package,
		});
	} catch (error) {
		res
			.status(500)
			.json({
				status: "Error",
				message: "Something went wrong in finding tour package",
				error: error,
			});
	}
};
// get tour package stats
exports.getTourPackageStats = async (req, res) => {
	try {
		// Get total number of tour packages
		const totalPackages = await TourModel.countDocuments();

		// Get number of packages in each city
		const packagesByCity = await TourModel.aggregate([
			{
				$group: {
					_id: "$city",
					count: { $sum: 1 },
				},
			},
		]);

		res.status(200).json({
			status: "Success",
			message: "Tour package statistics found successfully",
			data: {
				totalPackages: totalPackages,
				packagesByCity: packagesByCity,
			},
		});
	} catch (error) {
		res
			.status(500)
			.json({
				status: "Error",
				message: "Something went wrong in finding tour package statistics",
				error: error,
			});
	}
};
