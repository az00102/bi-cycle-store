import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// Routes
router.post('/', ProductControllers.createProduct); // POST /api/products
router.get('/', ProductControllers.getAllProduct);  // GET /api/products
router.get('/:productId', ProductControllers.getOneProduct); // GET /api/:products
router.put('/:productId', ProductControllers.updateProduct); // PUT /api/:products
router.delete('/:productId', ProductControllers.deleteProduct);// DELETE /api/:products

export default router;
