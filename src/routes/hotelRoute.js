const express = require('express');
const { createHotel, getAllHotels, getSingleHotel, updateHotel, filterHotels, getHotelStats, deleteHotel } = require('../controller/hotelController');
const { verifyAdmin, verifyUser } = require('../middleware/authVerifyMiddleware');
const hotelRouter = express.Router();

// create hotel
hotelRouter.post("/createHotel", verifyAdmin, createHotel)
// update hotel
hotelRouter.put("/updateHotel/:id", verifyUser, updateHotel)
// delete hotel
hotelRouter.delete("/deleteHotel/:id", verifyUser, deleteHotel)
// get all hotel
hotelRouter.get("/getAllHotels", getAllHotels)
// get single hotel
hotelRouter.get("/getSingleHotel/:id", getSingleHotel)
// get total hotel count
hotelRouter.get("/hotelStats", verifyAdmin, getHotelStats)



module.exports=hotelRouter;