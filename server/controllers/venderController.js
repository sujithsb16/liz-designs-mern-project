const asyncHandler = require("express-async-handler");
// const { Error } = require("mongoose");
const Vender = require("../models/venderModel");
const generateToken = require("../utils/generateToken");


const registerVender = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, mobile, experience, password } = req.body;
  const venderExists = await Vender.findOne({ email });
  if (venderExists) {
    res.status(400);
    throw new Error("vender Already Exists");
  }
  const vender = await Vender.create({
    firstName,
    lastName,
    email,
    mobile,
    experience,
    password,
  });
  if (vender) {
    res.status(201).json({
      _id: vender._id,
      name: [vender.firstName, vender.lastName],
      email: vender.email,
      mobile: vender.mobile,
      // password:vender.password,
      isAdmin: vender.isAdmin,
      token: generateToken(vender._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const venderLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const vender = await Vender.findOne({ email });
  if (vender && (await vender.matchPassword(password))) {
    res.json({
      _id: vender._id,
      name: vender.firstName,
      email: vender.email,
      mobile: vender.mobile,
      isAdmin: vender.isAdmin,
      isVerified:vender.isVerified,
      token: generateToken(vender._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password!");
  }
});

const venderDetails = asyncHandler(async (req,res) => {
  const {email} = req.body;


  
  const vender = await Vender.findOne({ email });
  if (vender) {
    res.json({
      _id: vender._id,
      name: vender.firstName,
      email: vender.email,
      mobile: vender.mobile,
      isAdmin: vender.isAdmin,
      isVerified: vender.isVerified,
      token: generateToken(vender._id),
    });
  } else {
    res.status(400);
    throw new Error("Test");
  }

})



module.exports = {registerVender, venderLogin, venderDetails,}