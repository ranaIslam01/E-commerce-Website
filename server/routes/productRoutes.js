import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProductReview, // <-- createProductReview import kora hocche
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js'; // <-- protect middleware import kora hocche

// Sob product paoar jonno route
router.route('/').get(getProducts);

// Ekta specific product-ke tar id diye khuje ber korar jonno route
router.route('/:id').get(getProductById);

// Notun review joma deoyar jonno route
// POST /api/products/:id/reviews
router.route('/:id/reviews').post(protect, createProductReview); // <-- Notun route ebong protect middleware

export default router;