# 🛍️ RANA-Shop

**RANA-Shop** is a full-featured E-commerce website built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) with TailwindCSS for styling. It is designed as a complete online shopping platform for Bangladeshi users, supporting user authentication, product search, cart system, payment integration, and a powerful admin dashboard.

---

## 🚀 Live Demo

🔗 [Visit Live Website](https://ecommerce-rana-islam.vercel.app/)

---

## 📸 Features

- 🔐 User Authentication (Register, Login, Logout)
- 🛍️ Browse & Search Products
- 🛒 Add to Cart, Checkout
- 💳 Payment Integration
- 🧑‍💼 Admin Dashboard to Manage Products & Orders
- 📱 Responsive UI for all devices
- 🌙 Dark/Light Mode (if included)

---

## 🛠️ Tech Stack

| Area       | Technology                 |
|------------|-----------------------------|
| Frontend   | React.js, TailwindCSS       |
| Backend    | Node.js, Express.js         |
| Database   | MongoDB (Mongoose)          |
| Auth       | JWT (JSON Web Token)        |
| Payment    | Stripe / (Optional Gateway) |
| Deployment | Vercel (Client), Render/Railway (Server) |

---

## 📁 Project Structure

E-commerce-Website/
├── client/ # Frontend (React + Tailwind)
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ └── ...
│ └── .env
├── server/ # Backend (Node + Express + MongoDB)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ranaIslam01/E-commerce-Website.git
cd E-commerce-Website
2. Install Client Dependencies
cd client
npm install
npm run dev
3. Install Server Dependencies
cd ../server
npm install
# Create .env file
npm run start
4. .env Configuration (server)
Create a .env file inside the server folder with:

MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
(Optional Stripe / API Keys can be added if needed)

🧑‍💻 Author
Name: Md Rana Islam

GitHub: @ranaIslam01

📜 License
This project is open-source and available under the MIT License.

🤝 Contribute
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change or improve.
