const express = require('express');
const { createHotel, getAllHotels, getSingleHotel, updateHotel } = require('../controller/hotelController');
const hotelRouter = express.Router();

// create hotel
hotelRouter.post("/createHotel", createHotel)
// update hotel
hotelRouter.put("/updateHotel/:id", updateHotel)
// delete hotel
hotelRouter.delete("/deleteHotel/:id",)
// get all hotel
hotelRouter.get("/getAllHotels", getAllHotels)
// get single hotel
hotelRouter.get("/getSingleHotel/:id", getSingleHotel)
// get by filter
hotelRouter.get("/getAllHotels/:location/:price/:quality/:retings/:name")
// get total hotel count




module.exports=hotelRouter;