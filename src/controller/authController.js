const userModel = require("../models/userModel/userModel");
const { validateEmail, validatePassword } = require("../utils/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
exports.registerUser = async (req, res) => {
	const { userName, email, password } = req.body;

	// Validate email format
	if (!validateEmail(email)) {
		return res
			.status(400)
			.json({ status: "Error", message: "Invalid email address" });
	}

	// Validate password format
	if (!validatePassword(password)) {
		return res.status(400).json({
			status: "Error",
			message:
				"Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long",
		});
	}

	try {
		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user object with hashed password
		const newUser = new userModel({
			userName,
			email,
			password: hashedPassword,
		});

		// Save the new user to the database
		const user = await newUser.save();

		res.status(201).json({
			status: "Success",
			message: "User registered successfully",
			data: user,
		});
	} catch (error) {
		if (error.code === 11000 && error.keyPattern && error.keyPattern.userName) {
			// Duplicate key error for userName
			return res.status(400).json({
				status: "Error",
				message: "User with this username already exists",
			});
		}

		// Handle other errors
		console.error("Error registering user:", error);
		res.status(500).json({
			status: "Error",
			message: "Something went wrong during user registration",
			error: error,
		});
	}
};

// login
exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// find user by email
		const user = await userModel.findOne({ email });

		// if user doesn't exist
		if (!user) {
			return res
				.status(401)
				.json({ status: "Error", message: "Invalid Email or Password" });
		}

		// match password
		const originalPassword = await bcrypt.compare(password, user.password);

		// if password didn't match
		if (!originalPassword) {
			return res
				.status(401)
				.json({ status: "Error", message: "Invalid Email or Password" });
		}
		// generate jwt
		const token = jwt.sign(
			{
				id: user?._id,
				email: user?.email,
				isAdmin: user?.isAdmin,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.cookie("access_token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			expires: new Date(Date.now() + 3600000), // 1 hour expiration
		});

		// if email & password match
		res.status(200).json({
			status: "Success",
			message: "Login Success",
			data: user,
		});
	} catch (error) {
		res.status(400).json({
			status: "Error",
			message: "Something went wrong on login",
			error: error,
		});
	}
};
