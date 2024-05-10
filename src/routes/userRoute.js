const express = require('express');
const { getAllUser, getSingleUser, upDateUser, deleteUser, getUserStats } = require('../controller/userController');
const { verifyToken, verifyUser, verifyAdmin } = require('../middleware/authVerifyMiddleware');
const userRouter = express.Router();



// get all user 
userRouter.get("/getAllUser", getAllUser);
// get single user
userRouter.get("/getSingleUser/:id", getSingleUser);
// get single user
userRouter.put("/updateUser/:id", upDateUser);
// get single user
userRouter.delete("/deleteUser/:id", deleteUser);
// get user stats
userRouter.get("/userStats", getUserStats);

module.exports=userRouter;