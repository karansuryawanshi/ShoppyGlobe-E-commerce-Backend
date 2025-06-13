# ShoppyGlobe E-commerce Backend API

This project is a **Node.js + Express + MongoDB** based REST API for the backend of an e-commerce application named **ShoppyGlobe**. It provides functionality for product management, shopping cart, and user authentication using JWT.

---

## Features

- User Registration and Login (JWT Auth)
- Product Listing, Detail Fetching & Creation
- Shopping Cart: Add, Update, Remove items
- Input Validation and Error Handling
- Protected Routes for Authenticated Users
- Tested via ThunderClient/Postman
- MongoDB Integration using Mongoose

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

---

## Project Structure

```
shoppyglobe-backend/
├── controllers/ # Logic for products, auth, cart
├── middleware/ # Auth
├── models/ # Mongoose schemas
├── routes/ # Route definitions
├── package.json
└── server.js
```

---

## ⚙️ Setup Instructions

```bash
git clone
cd shoppyglobe-backend
npm install
npm start                 # Start with nodemon
```

## API Endpoints

### Auth

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login and get JWT token |

### Products

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/products`     | Fetch all products  |
| GET    | `/api/products/:id` | Fetch product by ID |
| POST   | `/api/products`     | Create new product  |

### Cart (Protected)

| Method | Endpoint               | Description              |
| ------ | ---------------------- | ------------------------ |
| POST   | `/api/cart`            | Add product to cart      |
| PUT    | `/api/cart/:productId` | Update quantity in cart  |
| DELETE | `/api/cart/:productId` | Remove product from cart |

## License

This project is for educational purposes under Internshala Assessment.
