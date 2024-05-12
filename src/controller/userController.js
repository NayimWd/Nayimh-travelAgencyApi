const userModel = require("../models/userModel/userModel");
const {  validPhoneNumber } = require("../utils/helper");

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
        const userEmail = req.params.email;

        // Find the user by email
        const user = await userModel.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({
                status: 'Error',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'Success',
            data: user,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            status: 'Error',
            message: 'Something went wrong while fetching user',
            error: error,
        });
    }
};
// update user
exports.upDateUser = async (req, res) => {
	try {
        const userEmail = req.params.email;
        let userDataToUpdate = req.body;
		
        // Ensure email field is not included in the update
        if (userDataToUpdate.email) {
            delete userDataToUpdate.email;
        }

		   // Validate phone number format if provided
		   if (userDataToUpdate.phoneNumber && !validPhoneNumber(userDataToUpdate.phoneNumber)) {
            return res.status(400).json({
                status: 'Error',
                message: 'Invalid phone number format',
            });
        }

        // Find the user by email and update
        const updatedUser = await userModel.findOneAndUpdate(
            { email: userEmail },
            userDataToUpdate,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                status: 'Error',
                message: 'User not found',
            });
        }

        res.status(200).json({
            status: 'Success',
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            status: 'Error',
            message: 'Something went wrong while updating user',
            error: error,
        });
    }
};
// delete user
exports.deleteUser = async (req, res) => {
	try {
        const { email } = req.params;

        // Find and delete the user by email
        const deletedUser = await userModel.findOneAndDelete({ email: email });

        if (!deletedUser) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        res.status(200).json({
            status: "Success",
            message: "User deleted successfully",
            data: deletedUser,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            status: "Error",
            message: "Something went wrong in deleting user",
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