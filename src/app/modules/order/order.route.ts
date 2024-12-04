import express from "express"
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post('/', OrderControllers.createOrder); // POST /api/orders
router.get('/revenue', OrderControllers.getRevenue); // POST /api/orders/revenue

export default router;