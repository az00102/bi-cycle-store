import { z } from "zod";

const productValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name cannot be empty"),
  brand: z
    .string({
      required_error: "Brand name is required",
      invalid_type_error: "Brand must be a string",
    })
    .min(1, "Brand name cannot be empty"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be a positive number"),
  type: z.enum(["Mountain", "Road", "Hybrid", "BMX", "Electric"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be one of: Mountain, Road, Hybrid, BMX, Electric",
  }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(1, "Description cannot be empty"),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .nonnegative("Quantity must be a non-negative number"),
  inStock: z
    .boolean({
      required_error: "Instock is required",
      invalid_type_error: "Instock must be a boolean value",
    }),
});

export default productValidationSchema;
