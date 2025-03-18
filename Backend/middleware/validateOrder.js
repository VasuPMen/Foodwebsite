const validateOrder = (req, res, next) => {
    const { address, items, amount, paymentMethod } = req.body;

    if (!items || !items.length) {
        return res.status(400).json({ success: false, message: "Cart is empty!" });
    }

    if (!address || !amount || !paymentMethod) {
        return res.status(400).json({ success: false, message: "Missing required order details!" });
    }

    next(); // Proceed to the controller
};

export default validateOrder;
