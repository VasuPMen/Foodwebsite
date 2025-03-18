import OrderModel from "../models/orderModel.js";

const Orders = async (req, res) => {
    try {
        const { address, items, amount, paymentMethod, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required!" });
        }

        const newOrder = new OrderModel({
            userId,
            address,
            items,
            amount,
            paymentMethod,
            status: "Pending",
            createdAt: new Date(),
        });

        await newOrder.save();

        res.json({ success: true, message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const UserOrder = async (req, res) => {
    try {
        const { userId } = req.params; 
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required!" });
        }
        const orders = await OrderModel.find({ userId });

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found!" });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Error retrieving orders" });
    }
};
const listOrdrers = async(req,res)=>{
    try {
        const orders = await OrderModel.find({})
        res.json({success: true, data:orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error fetching orders"})
    }
}

const updateStatus = async(req,res)=>{
    try {
        await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.status(200).json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Error updating status"})
    }
}

export { Orders, UserOrder , listOrdrers , updateStatus};
