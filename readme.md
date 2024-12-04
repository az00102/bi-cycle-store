# Bi-Cycle Store 🚴‍♂️

An Express.js application built with TypeScript, integrated with MongoDB using Mongoose, for managing a **Bicycle Store**. This project provides robust CRUD operations and revenue calculation features.

---

## 🌟 Features

1. **Bicycle Management**
   - Create, retrieve, update, and delete bicycles.
   - Search bicycles by name, brand, or type.

2. **Order Management**
   - Place orders and update stock levels automatically.
   - Prevent orders with insufficient stock.

3. **Revenue Calculation**
   - Calculate total revenue from all orders using MongoDB aggregation.

---

## 📝 API Endpoints

### **Bicycle Endpoints**
- **Create Bicycle**: `POST /api/products`
- **Get All Bicycles**: `GET /api/products`
- **Get Bicycle by ID**: `GET /api/products/:productId`
- **Update Bicycle**: `PUT /api/products/:productId`
- **Delete Bicycle**: `DELETE /api/products/:productId`

### **Order Endpoints**
- **Place Order**: `POST /api/orders`
- **Calculate Revenue**: `GET /api/orders/revenue`

---

## 🚀 Technologies Used

- **Express.js**: Backend framework
- **TypeScript**: Type safety and improved developer experience
- **MongoDB**: Database for storing bicycles and orders
- **Mongoose**: ODM for MongoDB

---

## 🛠️ Setup Locally

### **Clone the Repository**

git clone https://github.com/az00102/bi-cycle-store.git
cd bi-cycle-store

---

### **Install the Required Packages**

- **Configure Environment Variables**:
Create a .env file in the root directory.
Add the following variables:
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
- **Start the Development Server**
For development:
npm run start:dev
---
```bash

