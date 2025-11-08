import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body; // ✅ Get userId from request body

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
        }

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!userData.cartData) {
            userData.cartData = {};
        }

        userData.cartData[itemId] = (userData.cartData[itemId] || 0) + 1;
        await userModel.findByIdAndUpdate(userId, { cartData: userData.cartData });

        res.json({ message: "Item added to cart", success: true, cartData: userData.cartData });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ message: "Error adding item to cart", success: false });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId } = req.user; // ✅ Fix: Extract from authenticated user
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({ success: false, message: "Item ID is required!" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        if (!user.cartData || !user.cartData[itemId]) {
            return res.status(400).json({ success: false, message: "Item not in cart!" });
        }

        if (user.cartData[itemId] > 1) {
            user.cartData[itemId] -= 1;
        } else {
            delete user.cartData[itemId]; // ✅ Remove item if count reaches 0
        }

        await user.save(); 

        res.json({ success: true, message: "Item removed from cart", cartData: user.cartData });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, message: "Error removing item from cart" });
    }
};


const getCart = async (req, res) => {
    try {
        const userId = req.user?.userId; 
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user ID found." });
        }
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.json({ success: true, cartData: user.cartData || {} });
    } catch (error) {
        console.error("Error getting cart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export { addToCart, removeFromCart, getCart };
