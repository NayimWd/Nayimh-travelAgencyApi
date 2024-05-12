//Basic import
const express = require("express");
const roomRouter = require("./src/routes/roomRouter.js");
const authRouter = require("./src/routes/authRoute.js");
const userRouter = require("./src/routes/userRoute.js");
const tourRouter = require("./src/routes/tourRoute.js");
const hotelRouter = require("./src/routes/hotelRoute.js");
const GlobalErrorBoundary = require("./src/middleware/ErrorBoundary.js");
const app = new express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// security middleware lib import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mogoSanatize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");

//Database lib import
const mongoose = require("mongoose");
const cartRouter = require("./src/routes/cartRoute.js");

// security middlware implement
app.use(helmet());
app.use(mogoSanatize());
app.use(hpp());

// body parser  implement | middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// rate limiter
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined
});

app.use(limiter);

// db connection
let mongoURI = process.env.MONGO_URL;

mongoose
	.connect(mongoURI)
	.then(() => {
		console.log("db connect success");
	})
	.catch((err) => {
		console.log("db connect failed");
		console.log(err);
	});

// routing implement
app.use("/api/v1", authRouter);
app.use("/api/v1", roomRouter);
app.use("/api/v1", tourRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", hotelRouter);
app.use("/api/v1", cartRouter )

// handle undefined route
app.use("*", (req, res) => {
	res
		.status(404)
		.json({ status: "Router Connect Failed", data: "Router Not Matched" });
});

// Global error boundary
app.use(GlobalErrorBoundary.handleError);

module.exports = app;
