const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      required: true,
      default: false,
    },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          qty: {
            type: Number,
            required: true,
          },
          price: {
            type: Number,
          },
        },
      ],
      totalPrice: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



userSchema.methods.addToCart = function (product) {
  console.log("model test");
  const cart = this.cart;
  console.log("model test 2");
  const isExisting = cart.items.findIndex((objInItems) => {
    return (
      new String(objInItems.productId).trim() == new String(product._id).trim()
    );
  });
  if (isExisting >= 0) {
    cart.items[isExisting].qty += 1;
  } else {
    cart.items.push({ productId: product._id, qty: 1, price: product.price });
  }
  cart.totalPrice += parseFloat(product.price);
  console.log("User in schema:", this);
  return this.save();
};


userSchema.methods.removefromCart = async function (productId) {
  if (!this.cart) {
    this.cart = { items: [], totalPrice: 0 };
  }
  const cart = this.cart;
  const isExisting = cart.items.findIndex(
    (objInItems) =>
      new String(objInItems.productId).trim() === new String(productId).trim()
  );
  if (isExisting >= 0) {
    const prod = await Product.findById(productId);
    cart.totalPrice -= prod.price * cart.item[isExisting].qty;
    cart.item.splice(isExisting, 1);
    console.log("User in schema:", this);
    return this.save();
  }
};



const User = mongoose.model("User", userSchema);

module.exports = User;
