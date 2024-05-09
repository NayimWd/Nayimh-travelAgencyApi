const express = require('express');
const { createHotel, getAllHotels, getSingleHotel, updateHotel, filterHotels, getHotelStats, deleteHotel } = require('../controller/hotelController');
const hotelRouter = express.Router();

// create hotel
hotelRouter.post("/createHotel", createHotel)
// update hotel
hotelRouter.put("/updateHotel/:id", updateHotel)
// delete hotel
hotelRouter.delete("/deleteHotel/:id", deleteHotel)
// get all hotel
hotelRouter.get("/getAllHotels", getAllHotels)
// get single hotel
hotelRouter.get("/getSingleHotel/:id", getSingleHotel)
// get total hotel count
hotelRouter.get("/hotelStats", getHotelStats)



module.exports=hotelRouter;