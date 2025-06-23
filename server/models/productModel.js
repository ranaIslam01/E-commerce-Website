import mongoose from 'mongoose';

// Review Schema (প্রোডাক্ট স্কিমার ভেতরেই থাকবে)
const reviewSchema = mongoose.Schema(
  {
    user: { // কোন ইউজার রিভিউ দিয়েছে তার আইডি
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // User মডেলের সাথে লিঙ্ক করা হচ্ছে
    },
    name: { type: String, required: true }, // ইউজারের নাম
    rating: { type: Number, required: true }, // রেটিং (১ থেকে ৫)
    comment: { type: String, required: true }, // রিভিউ কমেন্ট
  },
  {
    timestamps: true, // রিভিউ কখন দেওয়া হয়েছে তার সময়
  }
);

// Product er ki ki information thakbe tar schema
const productSchema = mongoose.Schema(
  {
    // --- আগের প্রপার্টিগুলো এখানে অপরিবর্তিত থাকবে ---
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: { // এই rating হবে সব রিভিউ এর গড়
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: { // মোট কতগুলো রিভিউ আছে
      type: Number,
      required: true,
      default: 0,
    },
    // --- এই পর্যন্ত আগের কোড ---

    reviews: [reviewSchema], // <-- নতুন: রিভিউগুলো এই অ্যারেতে জমা হবে
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;