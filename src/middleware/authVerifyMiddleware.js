const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel/userModel");

exports.verifyToken = async (req, res, next) => {
	const token = req.headers.access_token;

	if (!token) {
		res.status(401).json({ status: "Error", message: "Token Not Found" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res
				.status(403)
				.json({ status: "Error", message: "Token is not valid" });
		}
		req.user = decoded;
		next();
		
	});
};

exports.verifyUser = (req, res, next) => {
	this.verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return res
				.status(403)
				.json({ status: "Error", message: "You are not authorized" });
		}
	});
};

exports.verifyAdmin = (req, res, next) => {
	this.verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			return res
				.status(403)
				.json({ status: "Error", message: "You are not authorized" });
		}
	});
};

exports.verifyAccess = (req, res, next) => {};
