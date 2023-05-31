const asyncHandler = require("express-async-handler");
const Admin = require("../models/userModel");
const Vendor = require("../models/vendorModel");
const { generateToken } = require("../utils/generateToken");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Banner = require("../models/bannerModel");
const cloudinary = require("../utils/cloudinary");
const Order = require("../models/orderModel");



const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  
  console.log(email,password);
  const admin = await Admin.findOne({ email });
  
  if(admin){
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
  }else{
res.status(400);
throw new Error("Email not registered");
  }
  
});

////////////user start/////////////
const userList = asyncHandler(async (req, res) => {
  const allUser = await User.find();
  // console.log(allUser);
  res.json(allUser);
});

 const userStatusControl = asyncHandler(async (req, res) => {
   console.log("server test block user");
   const { id } = req.params;
   const { blocked } = req.body;

   console.log("status before " + blocked);

   const user = await User.findByIdAndUpdate(
     { _id: id },
     { $set: { isBlocked: blocked ? false : true } }
   );
   const updatedUser = await User.findById({ _id: id });

   console.log("status after " + updatedUser.isBlocked);

   if (user) {
     res.status(200).json({
       success: true,
       message: "User blocked/unblocked successfully!",
     });
   } else {
     res.status(404);
     throw new Error("User not found");
   }
 });



////////////user end/////////////////

/////////////vendor start///////////
const vendorList = asyncHandler(async (req, res) => {
  console.log("all vender list 1");
  const allVendors = await Vendor.find();
  res.json(allVendors);
});


const vendorVerifyControl = asyncHandler(async (req, res) => {
  console.log("server vendor verify test");
 const { id } = req.params;
 const { status } = req.body;
 
 console.log("status before " + status);

 const vendor = await Vendor.findByIdAndUpdate(
   { _id: id },
   { $set: { isVerified: status ? false : true } }
 );
 const updatedVendor = await Vendor.findById({ _id: id });

 console.log("status after " + updatedVendor.isVerified);

 if (vendor) {
   res.status(200).json({
     success: true,
     message: "Vendor Verified successfully!",
   });
 } else {
   res.status(404);
   throw new Error("Vendor not found");
 }
});

const vendorStatusControl = asyncHandler(async (req, res) => {
  console.log("server test block user");
  const { id } = req.params;
  const { blocked } = req.body;

  console.log("status before " + blocked);

  const vendor = await Vendor.findByIdAndUpdate(
    { _id: id },
    { $set: { isBlocked: blocked ? false : true } }
  );
  const updatedVendor = await Vendor.findById({ _id: id });

  console.log("status after " + updatedVendor.isBlocked);

  if (vendor) {
    res.status(200).json({
      success: true,
      message: "Vendor blocked/unblocked successfully!",
    });
  } else {
    res.status(404);
    throw new Error("Vendor not found");
  }
});



/////////////vendor end/////////////////


/////////////category start/////////////////

const addCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;

  console.log(category);

  if (category) {
    await Category.create({ category });
    res.status(200).json({
      success: true,
      message: "Category Added!",
    });
  } else {
    res.status(404);
    throw new Error("Category Failed");
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const categoryList = await Category.find();

  res.status(201).json(categoryList);
});

const categoryStatusControl = asyncHandler(async (req, res) => {
  console.log("server test block user");
  const { id } = req.params;
  const { blocked } = req.body;

  console.log("status before " + blocked);

  const category = await Category.findByIdAndUpdate(
    { _id: id },
    { $set: { isBlocked: blocked ? false : true } }
  );
  

  if (category) {
    res.status(200).json({
      success: true,
      message: "Category blocked/unblocked successfully!",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


/////////////category end/////////////////
/////////////product start/////////////////

const getAdminProduct = asyncHandler(async (req, res) => {

  const productList = await Product.find()
    .populate({
      path: "categoryId",
      select: "category",
    })
    .populate({
      path: "vendor",
      select: "firstName",
    });

  res.status(201).json(productList);
});

const productVerifyControl = asyncHandler(async (req, res) => {
  console.log("server product verify test");
  const { id } = req.params;
  const { status } = req.body;

  console.log("status before " + status);

  const product= await Product.findByIdAndUpdate(
    { _id: id },
    { $set: { isVerified: status ? false : true } }
  );
  const updatedProduct = await Product.findById({ _id: id });

  console.log("status after " + updatedProduct.isVerified);

  if (product) {
    res.status(200).json({
      success: true,
      message: "Product Verified successfully!",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const productStatusControl = asyncHandler(async (req, res) => {
  console.log("server test block product");
  const { id } = req.params;
  const { blocked } = req.body;

  console.log("status before " + blocked);

  const product = await Product.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        isBlocked: blocked ? false : true,
        adminBlocked: blocked ? false : true,
      },
    },
    { new: true }
  );

  const updatedProduct = await Product.findById({ _id: id });

  console.log("status after " + updatedProduct.isBlocked);

  if (product) {
    res.status(200).json({
      success: true,
      message: "Product blocked/unblocked successfully!",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});



/////////////prodcut end/////////////////
/////////////coupon start/////////////////

const addCoupon = asyncHandler(async (req, res) => {
  const { name, type, discount, validity, maxDiscount } = req.body;

  // console.log(coupon);

  if (name) {
    await Coupon.create({ name, type, discount, validity, maxDiscount });
    res.status(200).json({
      success: true,
      message: "Coupon Added!",
    });
  } else {
    res.status(404);
    throw new Error("Coupon Failed");
  }
});

const getCoupon = asyncHandler(async (req, res) => {
  const couponList = await Coupon.find();

  res.status(201).json(couponList);
});

const couponStatusControl = asyncHandler(async (req, res) => {
  console.log("server test block user");
  const { id } = req.params;
  const { blocked } = req.body;

  console.log("status before " + blocked);

  await Coupon.findByIdAndUpdate(
    { _id: id },
    { $set: { isBlocked: blocked ? false : true } }
  );
  const updatedCoupon = await Coupon.findById({ _id: id });

  console.log("status after " + updatedCoupon.isBlocked);

  if (updatedCoupon) {
    res.status(200).json({
      success: true,
      message: "Coupon blocked/unblocked successfully!",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});



/////////////coupon end/////////////////

///////////////banner start///////////
const addBanner = async (req, res) => {
  try {
    const { bannerName, image } = req.body;

    console.log(bannerName);

    // let image = req.body;

    console.log("add banner test");
    console.log(image);


    
      const result = await cloudinary.uploader.upload(image, {
        folder: "AdminBannerImage",
      });

      let imagesBuffer = {
        public_id: result.public_id,
        url: result.secure_url,
      };

   


    await Banner.create({
      banner:bannerName,
      image: imagesBuffer,
    });

    res.status(200).json({
      success: true,
      message: "Banner Added!",
    });

    //   .status(200)
    //   .json({ message: "Form data submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};

const getBanner = asyncHandler(async (req, res) => {
  const bannerList = await Banner.find();

  res.status(201).json(bannerList);
});

const bannerStatusControl = asyncHandler(async (req, res) => {
  console.log("server test block user");
  const { id } = req.params;
  const { blocked } = req.body;

  console.log("status before " + blocked);

  await Banner.findByIdAndUpdate(
    { _id: id },
    { $set: { isBlocked: blocked ? false : true } }
  );
  const updatedBanner = await Banner.findById({ _id: id });

  console.log("status after " + updatedBanner.isBlocked);

  if (updatedBanner) {
    res.status(200).json({
      success: true,
      message: "Banner blocked/unblocked successfully!",
    });
  } else {
    res.status(404);
    throw new Error("Banner not found");
  }
});

///////////////banner end/////////////

///////////////order start///////////
const getOrder = asyncHandler(async (req, res) => {
  try {
const orders = await Order.find()
  .populate([
    {
      path: "products.items.productId",
    },
    {
      path: "couponApplied",
    },
    {
      path: "userId",
    },
  ])
  .sort({ createdDate: -1 });

res.status(201).json(orders);    
  } catch (error) {

    log

    res.status(500).json(error.message)
    
  }

});

const orderStatusControl = asyncHandler(async (req, res) => {
  try {

     console.log("server test block product");
     const { id } = req.params;
     const { status } = req.body;

     console.log(status);

     // console.log("status before " + blocked);

     if (status === "Build") {
       const order = await Order.findByIdAndUpdate(
         { _id: id },
         {
           $set: {
             status: "Confirmed",
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
     }
     if (status === "Confirmed") {
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
     }
     if (status === "Packed") {
       const order = await Order.findByIdAndUpdate(
         { _id: id },
         {
           $set: {
             status: "Shipped",
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
     }

     if (status === "Shipped") {
       const order = await Order.findByIdAndUpdate(
         { _id: id },
         {
           $set: {
             status: "Delivered",
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
     }
  

    
  } catch (error) {

     res.status(500).json({
       success: true,
       message: error.message,
     });
    
  }
 
  

 
 
});
const orderDeliver = asyncHandler(async (req, res) => {
  console.log("server test block product");
  const { id } = req.params;

  // console.log("status before " + blocked);

  const order = await Order.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        status: "Delivered",
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


//////////////graph////////////////



const graphData = asyncHandler(async (req, res) => {
  try {

    console.log("Graph");

    const products = await Product.find().populate("categoryId");

    const data = products.map((product) => {
      return {
        categoryId: product.categoryId,
        sales: product.sales,
      };
    });

    console.log(data);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch graph data" });
  }
});

//////////////////////////////////


  

  // const userStatusControl = asyncHandler(async (req, res) => {
  //   console.log("server test block user");
  //   console.log(req.params.id);
  //   console.log(req.body.blocked);
  //   // const user = await User.findById(req.params.id);

  //   const { id } = req.params;

  //    const user = await User.findByIdAndUpdate(
  //      { _id: id },
  //      { $set: { isBlocked: blocked ? false : true } }
  //    );

  //   if (user) {
  //     res.status(200).json({
  //       success: true,
  //       message: "User blocked/unblocked successfully!",
  //     });
  //   } else {
  //     res.status(404);
  //     throw new Error("User Not Found!");
  //   }
  // });

 
  
  




module.exports = {
  adminLogin,
  vendorList,
  vendorVerifyControl,
  vendorStatusControl,
  userList,
  userStatusControl,
  addCategory,
  getCategory,
  categoryStatusControl,
  getAdminProduct,
  productVerifyControl,
  productStatusControl,
  addCoupon,
  getCoupon,
  couponStatusControl,
  addBanner,
  getBanner,
  bannerStatusControl,
  getOrder,
  orderStatusControl,
  orderDeliver,
  graphData,
};


  
