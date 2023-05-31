const asyncHandler = require("express-async-handler");
// const { Error } = require("mongoose");
const Vendor = require("../models/vendorModel");
// const generateToken = require("../utils/generateToken");
const cloudinary = require("../utils/cloudinary");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const { generateToken } = require("../utils/generateToken");
const Order = require("../models/orderModel");
// const Product = require("../models/productModel");


const registerVendor = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, mobile, experience, password } = req.body;
  const vendorExists = await Vendor.findOne({ email });
  if (vendorExists) {
    res.status(400);
    throw new Error("vendor Already Exists");
  }
  const vendor = await Vendor.create({
    firstName,
    lastName,
    email,
    mobile,
    experience,
    password,
  });
  if (vendor) {
    res.status(201).json({
      _id: vendor._id,
      name: [vendor.firstName, vendor.lastName],
      email: vendor.email,
      mobile: vendor.mobile,
      // password:vendor.password,
      isAdmin: vendor.isAdmin,
      token: generateToken(vendor._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const vendorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  const vendor = await Vendor.findOne({ email });
  console.log(vendor);
  if (vendor && (await vendor.matchPassword(password))) {
    res.json({
      _id: vendor._id,
      name: vendor.firstName,
      email: vendor.email,
      mobile: vendor.mobile,
      isAdmin: vendor.isAdmin,
      isVerified:vendor.isVerified,
      token: generateToken(vendor._id),
    });
  } else {
    console.log("vender login error");
    res.status(400);
    throw new Error("Invalid email or password!");
  }
});

const vendorDetails = asyncHandler(async (req,res) => {
  const {email} = req.body;


  
  const vendor = await Vendor.findOne({ email });
  if (vendor) {
    res.json({
      _id: vendor._id,
      name: vendor.firstName,
      email: vendor.email,
      mobile: vendor.mobile,
      isAdmin: vendor.isAdmin,
      isVerified: vendor.isVerified,
      token: generateToken(vendor._id),
    });
  } else {
    res.status(400);
    throw new Error("Test");
  }

})

const addProduct = async (req, res) => {
   
  try {
    const { name, price, description, category, qty } = req.body;

    let images = [...req.body.images];

 const categoryId = await Category.findOne({category});



    console.log("add product test");
    console.log(images);
   console.log(categoryId);
    // console.log(pName, pPrice, pDescription, pCategory);

   let imagesBuffer = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "vendorProductImages",
      });

      imagesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url,
      });

      console.log("controllers", imagesBuffer);
    }
    // req.body.images = imagesBuffer;

    

    await Product.create({
      name,
      price,
      description,
      category,
      qty,
      image: imagesBuffer,
      categoryId: categoryId._id,
      vendor: req.vendor._id,
    });

     res.status(200).json({
       success: true,
       message: "Category Added!",
     });



    // const parlourDetails = await vendor.save();
    // res
    //   .status(200)
    //   .json({ message: "Form data submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

const getCategory = asyncHandler(async (req, res) => {
  const categoryList = await Category.find();

  res.status(201).json(categoryList);
});

const getVendorProduct = asyncHandler(async (req, res) => {
  const productList = await Product.find({ vendor: req.vendor._id }).populate({
    path: "categoryId",
    select: "category",
  });

  res.status(201).json(productList);
});

const productStatusControl = asyncHandler(async (req, res) => {

  try {

     console.log("server test block product");
     const { id } = req.params;
     const { blocked } = req.body;

     console.log("status before " + blocked);

     const product = await Product.findById({ _id: id });

     if (product) {
       if (!product.adminBlocked) {
         const updatedProduct = await Product.findByIdAndUpdate(
           { _id: id },
           { $set: { isBlocked: blocked ? false : true } }
         );

         if (updatedProduct) {
           res.status(200).json({
             success: true,
             message: "Product blocked/unblocked successfully!",
           });
         }
       }else{
         res.status(404);
         throw new Error("Product Blocked by Admin");

       }
     } else {
       res.status(404);
       throw new Error("Product not found");
     }

    
  } catch (error) {

     res.status(404);
     throw new Error(error.message);
    
  }

 

});

//////////////////order start//////////////

const getOrder = asyncHandler(async (req, res) => {
  try {
const orders = await Order.find().populate([
  {
    path: "products.items.productId",
  },
  {
    path: "couponApplied",
  },
  {
    path: "userId",
  },
]);
res.status(201).json(orders);    
  } catch (error) {

    log

    res.status(500).json(error.message)
    
  }

});

const orderStatusControl = asyncHandler(async (req, res) => {
  console.log("server test block product");
  const { id } = req.params;

  // console.log("status before " + blocked);

  const order = await Order.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        status: "Packed",
      },
    },
    { new: true }
  );

  

 
  if (order) {
    res.status(200).json({
      success: true,
      message: "order status changed successfully!",
    });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
/////////////////////////////////////



module.exports = {
  registerVendor,
  vendorLogin,
  vendorDetails,
  addProduct,
  getCategory,
  getVendorProduct,
  productStatusControl,
  orderStatusControl,
  getOrder,
};