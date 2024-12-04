import { OrderModel } from "../order.model";
import { Order } from "./order.interface";

const createOrderIntoDB = async (orderData: Order) => {
    const order = new OrderModel(orderData);
    return await order.save();
};

const getRevenueFromDB = async () => {
    const revenue = await OrderModel.aggregate(
        [
            // Calculate revenue per order
            {
                $project: {
                    revenue: { $multiply: ["$quantity", "$totalPrice"] },
                },
            },
            // Sum up the revenue field
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$revenue" },
                },
            },
            // Include totalRevenue in the output
            {
                $project: {
                    _id: 0,
                    totalRevenue: 1,
                },
            }
        ]
    );

    return revenue;
}

export const OrderService = {
    createOrderIntoDB,
    getRevenueFromDB
}