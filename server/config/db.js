// ./config/db.js

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // ⬇️ এইখানেই Database Name দেখানোর জন্য কোড
    mongoose.connection.on("connected", () => {
      console.log(
        `✅ Connected to MongoDB database: ${mongoose.connection.name}`
      );
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
