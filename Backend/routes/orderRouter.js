import express from "express";
import { listOrdrers , Orders, updateStatus, UserOrder } from "../controllers/orderController.js";
import validateOrder from "../middleware/validateOrder.js"; // Import validation middleware

const router = express.Router();

router.post("/place", validateOrder, Orders);
router.post("/userorder/:userId", UserOrder);
router.get('/list',listOrdrers)
router.post("/status",updateStatus)

export default router;
