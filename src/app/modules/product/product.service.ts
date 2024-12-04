import { ProductModel } from "../product.model";
import { Product } from "./product.interface";

//for creating a product
const createProductIntoDB = async (productData: Product) => {
    const product = new ProductModel(productData);
    const result = await product.save();

    return result;
}

//to get all products
const getAllProductFromDB = async (searchTerm?: string) => {
    const filter: {
        $or?: {
          name?: { $regex: string; $options: "i" };
          brand?: { $regex: string; $options: "i" };
          type?: { $regex: string; $options: "i" };
        }[];
      } = {};
    
      if (searchTerm) {
        filter.$or = [
          { name: { $regex: searchTerm, $options: "i" } },
          { brand: { $regex: searchTerm, $options: "i" } },
          { type: { $regex: searchTerm, $options: "i" } },
        ];
      }

    // Retrieve filtered or all products
    const result = await ProductModel.find(filter);
    return result;
};

//to get a specific product
const getOneProductFromDB = async (productId: string) => {
    const result = await ProductModel.findById(productId);
    return result;
}

//to update product
const updateProductFromDB = async (productId: string, updateData: Partial<Product>) => {
    const result = ProductModel.findByIdAndUpdate(productId, { $set: updateData }, { new: true });
    return result;
}

const deleteProductFromDB = async (productId: string) => {
    const result = await ProductModel.findByIdAndDelete(productId);
    return result;
}

export const ProductServices = {
    createProductIntoDB,
    getAllProductFromDB,
    getOneProductFromDB,
    updateProductFromDB,
    deleteProductFromDB
}