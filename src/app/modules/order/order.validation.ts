import { z } from "zod";
import { Types } from "mongoose";

const orderValidationSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
    product: z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, "Invalid product ID")
        .transform((id) => new Types.ObjectId(id)), // Convert to ObjectId
    quantity: z
        .number()
        .int("Quantity must be an integer")
        .positive("Quantity must be greater than zero"),
    totalPrice: z
        .number()
        .positive("Total price must be greater than zero"),
});

export default orderValidationSchema;
