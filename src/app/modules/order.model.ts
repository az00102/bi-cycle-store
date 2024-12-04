import { model, Schema } from "mongoose";
import { Order } from "./order/order.interface";

const orderSchema = new Schema<Order>({
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    product: {
        type: Schema.Types.ObjectId,
        required: [true, 'Product is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: [true, 'TotalPrice is required'],
    }
},
    {
        timestamps: true,
    }
);

export const OrderModel = model<Order>('order', orderSchema);