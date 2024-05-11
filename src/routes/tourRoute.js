const express = require('express');
const { verifyAdmin, verifyUser } = require('../middleware/authVerifyMiddleware');
const { createTourPackage, updateTourPackage, deleteTourPackage, getAllTour, getSingleTourPackage, getTourPackageStats } = require('../controller/tourController');
const { getSingleHotel } = require('../controller/hotelController');
const tourRouter = express.Router();

// create tour package
tourRouter.post("/createPackage", verifyAdmin, createTourPackage)
// update tour package
tourRouter.put("/updatePackage/:id", verifyUser, updateTourPackage)
// delete tour package
tourRouter.delete("/deletePackage/:id", verifyUser, deleteTourPackage)
// get all tour package
tourRouter.get("/getAllPackage", getAllTour)
// get single tour package
tourRouter.get("/getSinglePackage/:id", getSingleTourPackage)
// get tour package stats
tourRouter.get("/getTourStats", verifyAdmin, getTourPackageStats)

module.exports=tourRouter;