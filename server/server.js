import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';

// ✅ প্রথমেই .env config করুন
dotenv.config();

// ✅ এখন MONGO_URI log করুন
console.log("Mongo URI from .env:", process.env.MONGO_URI);

// ✅ এরপর DB connect করুন
connectDB();

const app = express();

// CORS middleware
app.use(cors({
  origin: [
    'https://ecommerce-rana-islam.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// ✅ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
