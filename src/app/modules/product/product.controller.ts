import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";
import { z } from "zod";

//for creating a product
const createProduct = async (req: Request, res: Response) => {
    try {
        //validation using zod
        const zodParsedData = productValidationSchema.parse(req.body);
        //will call service function to send this data
        const result = await ProductServices.createProductIntoDB(zodParsedData);
        // Send success response
        res.status(201).json({
            message: "Bicycle created successfully",
            success: true,
            data: result,
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
}

//to get all products
const getAllProduct = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query; // Query parameter for filtering /api/products?searchTerm=type

        const products = await ProductServices.getAllProductFromDB(searchTerm as string);
        res.status(200).json({
            message: "Bicycles retrieved successfully",
            success: true,
            data: products,
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

//to get a specific product
const getOneProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;
        const product = await ProductServices.getOneProductFromDB(productId);

        if (!product) {
            res.status(404).json({
                message: "Product not found. Please check the ID and try again.",
                success: false,
            })
            return;
        }
        res.status(200).json({
            message: "Bicycle retrieved successfully",
            success: true,
            data: product,
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
}

//to update data
const updateProduct = async (req: Request, res: Response): Promise<void> => {

    try {

        const { productId } = req.params;
        const updateData = req.body;

        const updatedProduct = await ProductServices.updateProductFromDB(productId, updateData);

        if (!updatedProduct) {
            res.status(404).json({
                message: "Product was not found. Please check the ID and try again",
                status: false,
            });
            return;
        }
        const updatedFields = Object.keys(updateData);
        const comments: Record<string, string> = {};

        updatedFields.forEach((field) => {
            switch (field) {
                case 'name':
                    comments.name = 'Name Updated';
                    break;
                case "price":
                    comments.price = "Updated price";
                    break;
                case "quantity":
                    comments.quantity = "Updated quantity";
                    break;
                case "brand":
                    comments.brand = "Updated brand";
                    break;
                case "type":
                    comments.type = "Updated type";
                    break;
                case "description":
                    comments.description = "Updated description";
                    break;
                case "inStock":
                    comments.inStock = "Updated stock";
                    break;
                default:
                    comments[field] = `Updated field: ${field}`;
                    break;
            }
        });

        res.status(200).json({
            message: "Bicycle updated successfully",
            status: true,
            data: { ...updatedProduct?.toObject(), comments },
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
}

//to delete a product
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;

        const deletedProduct = await ProductServices.deleteProductFromDB(productId);
        if (!deletedProduct) {
            res.status(404).json({
                message: "Product was not found. Please check the ID and try again",
                status: false,
            });
        }

        res.status(200).json({
            message: "Bicycle deleted successfully",
            status: true,
            data: {},
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
}

export const ProductControllers = {
    createProduct,
    getAllProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
}