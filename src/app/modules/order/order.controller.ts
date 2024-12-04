import { Request, Response } from "express";
import { z } from "zod";
import orderValidationSchema from "./order.validation";
import { OrderService } from "./order.service";
import { ProductModel } from "../product.model";

const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product, quantity } = req.body;
        const zodParsedData = orderValidationSchema.parse(req.body);
        const existProduct = await ProductModel.findById(product);

        if (!existProduct || existProduct.inStock === false || existProduct.quantity < quantity) {
            res.status(400).json({
                success: false,
                message: 'Insufficient stock or product not found',
            });
        }

        //create order
        const order = await OrderService.createOrderIntoDB(zodParsedData);

        //reduce the product quantity
        if (existProduct != null) {
            existProduct.quantity -= quantity;
            await existProduct.save();
        }

        if (!!existProduct && existProduct.quantity === 0) {
            existProduct.inStock = false;
            await existProduct.save();
        }

        res.status(201).json({
            message: "Order created successfully",
            success: true,
            data: order,
        });


    }catch (error: unknown) {
        if (error instanceof z.ZodError) {
            // Validation error from Zod
            res.status(400).json({
                message: "Validation failed",
                success: false,
                errors: error.errors,
                stack: error.stack,
            });
        } else if (error instanceof Error) {
            // General server error
            res.status(500).json({
                message: "Something went wrong",
                success: false,
                stack: error.stack,
            });
        } 
    }
};

const getRevenue = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await OrderService.getRevenueFromDB();

        if (!result || result.length === 0) {
            res.status(400).json({
                success: false,
                message: 'Revenue was not found',
            });
        }

        const totalRevenue = result[0]

        res.status(201).json({
            message: "Revenue calculated successfully",
            success: true,
            data: totalRevenue,
        });



    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            // Validation error from Zod
            res.status(400).json({
                message: "Validation failed",
                success: false,
                errors: error.errors,
                stack: error.stack,
            });
        } else if (error instanceof Error) {
            // General server error
            res.status(500).json({
                message: "Something went wrong",
                success: false,
                stack: error.stack,
            });
        } 
    }

};


export const OrderControllers = {
    createOrder,
    getRevenue
}