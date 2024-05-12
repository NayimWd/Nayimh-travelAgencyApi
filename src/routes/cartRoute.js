const express = require('express');
const { createCart, getCartByEmail } = require('../controller/cartController');
const { verifyAdmin, verifyUser } = require('../middleware/authVerifyMiddleware');

const cartRouter = express.Router();

// create cart
cartRouter.post("/createCart", createCart );
// update cart
cartRouter.put("/updateCart/:userEmail/:itemId", verifyUser)
// delete cart
cartRouter.delete("/deleteCart/:userEmail/:userEmail", verifyUser, )
// get all cart data
cartRouter.get("/getAllCart", verifyAdmin, )

// get cart by user email
cartRouter.get("/getCartByEmail/:userEmail", getCartByEmail )

module.exports = cartRouter;