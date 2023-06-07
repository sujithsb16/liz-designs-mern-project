
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  adminBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  sales: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  ratedBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  qty: {
    type: Number,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendor",
  },
  productRating: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        default: 0,
      },
    },
  ],
});








const Product = mongoose.model("Product", productSchema);

module.exports = Product;