import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import productRoutes from './app/modules/product/product.route'
import orderRoutes from './app/modules/order/order.route';

const app: Application = express()

//parser
app.use(express.json())
app.use(cors())

// Default route (optional)
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API!");
});

//application routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes)

console.log(process.cwd())

export default app
