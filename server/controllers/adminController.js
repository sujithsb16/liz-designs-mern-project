const asyncHandler = require("express-async-handler");
const Admin = require("../models/userModel");
const Vender = require("../models/venderModel");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");



const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  

  const admin = await Admin.findOne({ email });

  if (!admin.isAdmin) {
    res.status(400);
    throw new Error("Not an admin!");
  } else {
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.firstName,
        email: admin.email,
        mobile: admin.mobile,
        isAdmin: admin.isAdmin,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid email or password!");
    }
  }
});

const venderList = asyncHandler(async (req, res) => {
  const allVenders = await Vender.find();
  res.json(allVenders);
});

const userList = asyncHandler(async (req, res) => {
  const allUser = await User.find();
  // console.log(allUser);
  res.json(allUser);
});

const verifyVender = asyncHandler( async(req, res) => {
  console.log("server test");
  console.log(req.params.id);
  console.log(req.body.isVerified);
   const vender = await Vender.findById(req.params.id);
    if (vender) {

      vender.isVerified = req.body.isVerified;

      await vender.save();

    
   
      
    } else {
      res.status(404);
      throw new Error("vender Not Found!");
    }
  })

  const blockVender = asyncHandler(async (req, res) => {
    console.log("server test block");
    console.log(req.params.id);
    console.log(req.body.blocked);
    const vender = await Vender.findById(req.params.id);
    if (vender) {
      vender.isBlocked = req.body.blocked;

      await vender.save();
       res.status(200).json({ success: true, message: "Vender blocked/unblocked successfully!" });
    } else {
      res.status(404);
      throw new Error("vender Not Found!");
    }
  });
  const blockUser = asyncHandler(async (req, res) => {
    console.log("server test block user");
    console.log(req.params.id);
    console.log(req.body.blocked);
    const user = await User.findById(req.params.id);
    if (user) {
      user.isBlocked = JSON.parse(req.body.blocked)

      await user.save();
       res
         .status(200)
         .json({
           success: true,
           message: "User blocked/unblocked successfully!",
         });
    } else {
      res.status(404);
      throw new Error("User Not Found!");
    }
  });

module.exports = { adminLogin,venderList, verifyVender, blockVender, userList, blockUser };


  
