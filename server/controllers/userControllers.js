const asyncHandler = require("express-async-handler");
// const { Error } = require("mongoose");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

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

const verifyUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
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

module.exports = { registerUser, verifyUser };
