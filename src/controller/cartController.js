const userModel = require("../models/userModel/userModel");

// Controller function to add item to user's cart
exports.createCart = async (req, res) => {
    const { userEmail, item } = req.body;

    try {
        // Find the user by email
        const user = await userModel.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the item to the user's cart
        user.cart.push(item);
        
        // Save the updated user document
        await user.save();

        return res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};




// get cart by user
exports.getCartByEmail = async (req, res) => {
    const userEmail = req.params.userEmail;

    try {
        // find user by email
        const user = await userModel.find({email: userEmail})

        if(!user){
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            })
        }

        return res.status(200).json({ cart: user.cart });

    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Internal server error"
         });
    }
    
};