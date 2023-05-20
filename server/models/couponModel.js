const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
    required: true,
  },
  usedBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  validity: {
    type: Date,
    required: true,
  },
  maxDiscount: {
    type: Number,
    default: 0,
    required: function () {
      return this.type === "upto";
    },
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
