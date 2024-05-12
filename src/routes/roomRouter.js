const express = require('express');
const { verifyAdmin } = require('../middleware/authVerifyMiddleware');
const { createRooms, updateRoom, deleteRoom, getAllRooms, getSingleRoom } = require('../controller/roomController');
const roomRouter = express.Router();

// create room
roomRouter.post("/createRoom/:id", verifyAdmin, createRooms)
// update room
roomRouter.put("/updateRoom/:hotelId/:roomId", verifyAdmin, updateRoom)
// update room
roomRouter.delete("/deleteRoom/:hotelId/:roomId", verifyAdmin, deleteRoom)
// get all rooms
roomRouter.get("/getRooms/:hotelId",  getAllRooms)
// get single rooms
roomRouter.get("/getSingleRoom/:hotelId/:roomId", getSingleRoom)

module.exports=roomRouter;