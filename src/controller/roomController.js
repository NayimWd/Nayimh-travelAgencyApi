const roomModel = require("../models/roomModel/roomModel");
const hotelModel = require("../models/hotelModel/hotelModel");
const { v4: uuidv4 } = require('uuid');
const { Types } = require('mongoose');
const { isValidObjectId } = require('mongoose').Types.ObjectId;


exports.createRooms = async (req, res) => {
    try {
        // find hotel by id
        const hotelId = req.params.id;
        // getting room data
        const roomData = req.body;

        // Generate a unique _id for the room document
        const roomId = uuidv4();

        // Add the generated _id to the room data
        roomData.id = roomId;

        // creating room
        const newRoom = await roomModel(roomData);
        // save room to db
        const savedRoom = await newRoom.save();

        // find by hotel id
        const hotel = await hotelModel.findById(hotelId);

        // check hotel exist or not
        if (!hotel) {
            res.status(404).json({
                status: "Error",
                message: "Hotel is not found",
            });
        }

        // adding room to hotel's rooms array
        hotel.rooms.push(savedRoom);
        await hotel.save();

        res.status(201).json({
            status: "Success",
            message: "Room Created and added to hotel successfully",
            data: savedRoom,
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Something went wrong in creating room",
            error: error,
        });
    }
};

// update rooms
exports.updateRoom = async (req, res) => {
    try {
        const { hotelId, roomId } = req.params;
        const roomData = req.body;

        // Find the hotel by ID
        const hotel = await hotelModel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({ status: "Error", message: "Hotel not found" });
        }

        // Find the index of the room in the hotel's rooms array
        const roomIndex = hotel.rooms.findIndex(room => room.id === roomId);

        if (roomIndex === -1) {
            return res.status(404).json({ status: "Error", message: "Room not found" });
        }

        // Retain the existing ID if not provided in the update data
        if (!roomData.id) {
            roomData.id = roomId;
        }

        // Update the room details
        hotel.rooms[roomIndex] = roomData;

        // Save the updated hotel document
        await hotel.save();

        res.status(200).json({
            status: "Success",
            message: "Room updated successfully",
            data: hotel.rooms[roomIndex]
        });
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ status: "Error", message: "Something went wrong in updating room", error: error });
    }
};

// delete room
exports.deleteRoom = async (req, res) => {
    try {
        const { hotelId, roomId } = req.params;

        // Find the hotel by ID
        const hotel = await hotelModel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({ status: "Error", message: "Hotel not found" });
        }

        // Find the index of the room in the hotel's rooms array
        const roomIndex = hotel.rooms.findIndex(room => room.id === roomId);

        if (roomIndex === -1) {
            return res.status(404).json({ status: "Error", message: "Room not found" });
        }

        // Remove the room from the hotel's rooms array
        hotel.rooms.splice(roomIndex, 1);

        // Save the updated hotel document
        await hotel.save();

        res.status(200).json({ status: "Success", message: "Room deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ status: "Error", message: "Something went wrong in deleting room", error: error });
    }
};

// get all hotel
exports.getAllRooms = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;
      
        // Find the hotel by ID
        const hotel = await hotelModel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({ status: "Error", message: "Hotel not found" });
        }

        // Return the rooms of the hotel
        res.status(200).json({ status: "Success", data: hotel.rooms });
    } catch (error) {
        console.error("Error getting rooms:", error);
        res.status(500).json({ status: "Error", message: "Something went wrong in getting rooms", error: error });
    }
};


// get single room
exports.getSingleRoom = async (req, res) => {
    try {
        const { hotelId, roomId } = req.params;
      
        // Find the hotel by ID
        const hotel = await hotelModel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({ status: "Error", message: "Hotel not found" });
        }

        // Find the room within the hotel's rooms array
        const room = hotel.rooms.find(room => room.id === roomId);

        if (!room) {
            return res.status(404).json({ status: "Error", message: "Room not found" });
        }

        res.status(200).json({ status: "Success", data: room });
    } catch (error) {
        console.error("Error getting single room:", error);
        res.status(500).json({ status: "Error", message: "Something went wrong in getting single room", error: error });
    }
};