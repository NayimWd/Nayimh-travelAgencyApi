const userModel = require("../models/userModel/userModel");

// Get all user
exports.getAllUser = async (req, res) => {
	let limit = parseInt(parseInt(req.query.limit)) || 10;
	const { sort = "-createdAt" } = req.query;

	try {
		const users = await userModel.find().limit(limit).sort(sort);

		// Check if users exist
		if (users.length === 0) {
			return res
				.status(404)
				.json({ status: "NotFound", message: "No users found" });
		}

		// Return users
		res
			.status(200)
			.json({ status: "Success", message: "All users found", data: users });
	} catch (error) {
		console.error("Error fetching users:", error);
		res
			.status(500)
			.json({
				status: "Error",
				message: "Something went wrong in fetching users",
				error: error,
			});
	}
};
// Get single user
exports.getSingleUser = async (req, res) => {
	try {
		const userId = req.params.id;

		// find with id
		user = await userModel.findById(userId);
		// check if user exist
		if (!user) {
			return res.json(400).json({ status: "NotFound" });
		}

		res
			.status(200)
			.json({ status: "Success", message: "User Found", data: user });
	} catch (error) {
		res.status(500).json({
			status: "Error",
			message: "somethong went wrong fetching the user",
		});
	}
};
// update user
exports.upDateUser = async (req, res) => {
	try {
		const userId = req.params.id;

		// data for update
		const updateData = req.body;

		// find and update user
		const updateUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

		// check user exist
		if (!updateUser) {
			return res
				.status(404)
				.json({ status: "Error", message: "User not found" });
		}

		// Return updated user
		res
			.status(200)
			.json({
				status: "Success",
				message: "User updated successfully",
				data: updateUser,
			});
	} catch (error) {
		res.status(500).json({
			status: "Error",
			message: "something went wrong updating the user",
		});
	}
};
// delete user
exports.deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;

		const deletedUser = await userModel.findByIdAndDelete(userId);

		// check if user exist
		if (!deletedUser) {
			return res
				.status(404)
				.json({ status: "Error", message: "User not found" });
		}

		// Return deleted user
		res
			.status(200)
			.json({
				status: "Success",
				message: "User deleted successfully",
				data: deletedUser,
			});
	} catch (error) {
		res
			.status(500)
			.json({
				status: "Error",
				message: "Something went wrong in deleting the user",
				error: error,
			});
	}
};


// userStats
exports.getUserStats = async (req, res) => {
    try {
        // Calculate total number of users
        const totalUsers = await userModel.countDocuments();

        // Return user stats
        res.status(200).json({ status: "Success", message: "User stats retrieved", data: { totalUsers } });
    } catch (error) {
        console.error("Error fetching user stats:", error);
        res.status(500).json({ status: "Error", message: "Something went wrong in fetching user stats", error: error });
    }
};