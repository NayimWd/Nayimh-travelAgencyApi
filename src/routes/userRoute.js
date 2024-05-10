const express = require('express');
const { getAllUser, getSingleUser, upDateUser, deleteUser, getUserStats } = require('../controller/userController');
const {  verifyUser, verifyAdmin } = require('../middleware/authVerifyMiddleware');
const userRouter = express.Router();



// get all user 
userRouter.get("/getAllUser", verifyAdmin, getAllUser);
// get single user
userRouter.get("/getSingleUser/:id", verifyUser, getSingleUser);
// get single user
userRouter.put("/updateUser/:id",verifyUser, upDateUser);
// get single user
userRouter.delete("/deleteUser/:id",verifyUser, deleteUser);
// get user stats
userRouter.get("/userStats", verifyAdmin, getUserStats);

module.exports=userRouter;