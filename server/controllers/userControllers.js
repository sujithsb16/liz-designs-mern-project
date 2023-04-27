const asyncHandler = require("express-async-handler");
// const { Error } = require("mongoose");
const User = require("../models/userModel");
const {generateToken}= require("../utils/generateToken");
const Product = require("../models/productModel");

// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, mobile, password, isAdmin } = req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("user already exists");
//   }

//   const user = await User.create({
//     name,
//     email,
//     mobile,
//     password,
//     isAdmin,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       mobile: user.mobile,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       //   token: generateToken(user._id),
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Error occured");
//   }
// });

// const verifyUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       mobile: user.mobile,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       //   token: generateToken(user._id),
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("invalid email or password");
//   }
// });

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user Already Exists");
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    mobile,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: [user.firstName, user.lastName],
      email: user.email,
      mobile: user.mobile,
      // password:user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email);

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.firstName,
      email: user.email,
      mobile: user.mobile,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password!");
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const productList = await Product.find();

  res.status(201).json(productList);
});

const getSingletProduct = asyncHandler(async (req, res) => {
  const {id} = req.params;
  console.log(id);
  const product = await Product.findById(id);
if(product){
res.status(201).json(product);
}else{
  res.status(400);
  throw new Error("Product not Found!");
}
  
});

const addToCart = asyncHandler(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const user = req.user;
    console.log("server" + productId ,user);
    const userData = await User.findById({ _id: user._id });
    const productData = await Product.findById({ _id: productId });
    userData.addToCart(productData);
    
  } catch (error) {
    console.log(error.message);
  }
});


const getCart = asyncHandler(async (req, res) => {

  try {

    const userId = req.user._id

    console.log(userId);

    const cartList = await User.findById({_id:userId}).populate({path:"cart.items.productId"})
    console.log(cartList);
res.status(201).json(cartList);
    
  } catch (error) {

    console.log(error);
    
  }
} )

module.exports = {
  registerUser,
  userLogin,
  getProduct,
  getSingletProduct,
  addToCart,
  getCart,
};
