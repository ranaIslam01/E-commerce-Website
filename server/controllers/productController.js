import Product from '../models/productModel.js';

// @desc    Fetch all products OR products matching a keyword
// @route   GET /api/products?keyword=yourSearchTerm
// @access  Public
const getProducts = async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  try {
    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ message: 'Server Error: Could not fetch products' });
  }
};

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(`Error fetching product by ID: ${error.message}`);
    res.status(500).json({ message: 'Server Error: Could not fetch product details' });
  }
};

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private (শুধুমাত্র লগইন করা ইউজার রিভিউ দিতে পারবে)
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body; // Request body থেকে rating এবং comment নেওয়া হচ্ছে

  try {
    const product = await Product.findById(req.params.id); // URL থেকে প্রোডাক্ট আইডি দিয়ে প্রোডাক্ট খোঁজা হচ্ছে

    if (product) {
      // চেক করা হচ্ছে ইউজার আগে থেকেই এই প্রোডাক্টে রিভিউ দিয়েছে কিনা
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString() // req.user._id আসবে protect middleware থেকে
      );

      if (alreadyReviewed) {
        res.status(400).json({ message: 'Product already reviewed by this user' });
        return;
      }

      // নতুন রিভিউ অবজেক্ট তৈরি করা হচ্ছে
      const review = {
        name: req.user.name, // লগইন করা ইউজারের নাম
        rating: Number(rating),
        comment,
        user: req.user._id, // লগইন করা ইউজারের আইডি
      };

      product.reviews.push(review); // প্রোডাক্টের reviews অ্যারেতে নতুন রিভিউ যোগ করা হচ্ছে

      // মোট রিভিউ সংখ্যা এবং গড় রেটিং আপডেট করা হচ্ছে
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save(); // প্রোডাক্টটি সেভ করা হচ্ছে ডাটাবেসে
      res.status(201).json({ message: 'Review added successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(`Error creating product review: ${error.message}`);
    res.status(500).json({ message: 'Server Error: Could not add review' });
  }
};

export { getProducts, getProductById, createProductReview }; // <-- createProductReview এক্সপোর্ট করা হয়েছে