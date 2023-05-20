const asyncHandler = require("express-async-handler");
// const { Error } = require("mongoose");
const User = require("../models/userModel");
const {generateToken}= require("../utils/generateToken");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Banner = require("../models/bannerModel");
const Order = require("../models/orderModel");

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
      name2: user.lastName,
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



const updateUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = req.body;

    console.log(userId);
    
    const user = await User.findById({ _id: userId });

   
if (!user) {
 res.status(400);
 throw new Error("User not found");
}
 else {
  user.firstName = updatedUser.firstName || user.firstName;
  user.lastName = updatedUser.lastName || user.lastName;
  user.email = updatedUser.email || user.email;
  user.mobile = updatedUser.mobile || user.mobile;
}

 const userData = await user.save();
 if (userData){res.status(201).json({
   _id: user._id,
   name: user.firstName,
   name2: user.lastName,
   email: user.email,
   mobile: user.mobile,
   isAdmin: user.isAdmin,
   token: generateToken(user._id),
 });}
   
    // res.status(201).json({ message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});




const getProduct = asyncHandler(async (req, res) => {
  const productList = await Product.find();

  res.status(201).json(productList);
});

const getSingletProduct = asyncHandler(async (req, res) => {
  const {id} = req.params;
  console.log(id);
  const product = await Product.findById(id).populate({path:"vendor"});
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
    console.log(productId);
    const user = req.user;
    // console.log("server" + productId ,user);
    const userData = await User.findById({ _id: user._id });
    const productData = await Product.findById({ _id: productId });
    console.log(productData);
    userData.addToCart(productData);
        res.status(201).json({ message: "activated successfully" });

    
  } catch (error) {
    console.log(error.message);
        res.status(500).json({ message: error.message });

  }
});

const editCart = asyncHandler(async (req, res, next) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const user = req.user;
    console.log("server" + productId ,user);
    const userData = await User.findById({ _id: user._id });
    const productData = await Product.findById({ _id: productId });
    // console.log(productData);
    userData.editCart(productData);
        res.status(201).json({ message: "activated successfully" });

    
  } catch (error) {
    console.log(error.message);
        res.status(500).json({ message: error.message });

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



const userProfile = asyncHandler(async (req, res) => {

  try {

    const userId = req.user._id

    console.log(userId);

    const coupons = await Coupon.find({ isBlocked: false });
    const user = await User.findById({ _id: userId }).select("-password");
    const orders = await Order.find({ userId: user._id }).populate({
      path: "products.items.productId",
    }).populate({
      path: "couponApplied",
    });

    if(!coupons){
      res.status(400);
      throw new Error("No coupons availabe");
    }

    console.log(coupons);
    res.status(201).json({ coupons, user, orders });
    
  } catch (error) {

    console.log(error);
        res.status(500).json({ message: error.message });

    
  }
} )

const getUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate("activatedCoupons", "-createdAt -updatedAt")
      .populate({ path: "cart.items.productId" });
    if (!user) {
      res.status(400);
      throw new Error("No user available");
    }
    res.status(201).json( user );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

const addAddress = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const address = req.body;

    console.log(userId);
    console.log(address);

    const user = await User.findById({ _id: userId });

    if (!user) {
      res.status(400);
      throw new Error("User Not Found");
    }

    const newAddress = {
      title:address.title,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zip,
    };
    user.addresses.push(newAddress);

    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

const activateCoupon = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const couponId = req.params.couponId;

    // Find the coupon with the given ID
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      res.status(400);
      throw new Error("Coupon not found");
    }

    // Check if the coupon is valid
    if (coupon.isBlocked || new Date() > coupon.validity) {
      res.status(400);
      throw new Error("Coupon is invalid");
    }

    // Add the coupon ID to the user's activatedCoupons field
    const user = await User.findById(userId);
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    // user.activatedCoupons.push(couponId);
    // await user.save();

    const userUpdate = await User.updateOne(
      { _id: userId },
      { $push: { activatedCoupons: couponId } }
    );

    res.status(201).json({ message: "Coupon activated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

const deleteCart = asyncHandler(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id;
    const userData = await User.findById({ _id: userId });
    await userData.removefromCart(productId);
    res.status(201).json({ message: "deleted sucessfully" });
  } catch (error) {
    console.log(error.message);
  }
});


const pagination = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const product = await Protduct.findAll({ where: { userId: user.id } });
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};

    results.totalPrtoduct = product.length;

    results.pageCount = Math.ceil(product.length / limit);

    if (lastIndex < product.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    // const pendingTasks = tasks?.filter((task) => !task.status);

    // results.pendingTasks = pendingTasks.length;

    results.result = product.slice(startIndex, lastIndex);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const updateCart = async (req, res) => {
  try {
     const productId = req.params.id;
     console.log(productId);
     const user = req.user;
    const userData = await User.findById({ _id: user._id });
    const foundProduct = userData.cart.item.findIndex(
      (objInItems) => objInItems.productId == productId
    );
    const qty = { a: parseInt(req.params.qty) };

    userData.cart.item[foundProduct].qty = qty.a;

    userData.cart.totalPrice = 0;
    const price = userData.cart.item[foundProduct].price;
    const totalPrice = userData.cart.item.reduce((acc, curr) => {
      return acc + curr.price * curr.qty;
    }, 0);
    userData.cart.totalPrice = totalPrice;
    await userData.save();
    // res.redirect("/cart");
    res.status(201).json({ message: "cart updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

//////////////////wishList/////////////

const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const user = req.user;
    const userData = await User.findById({ _id: user._id });
    const productData = await Product.findById({ _id: productId });
    userData.addToWishlist(productData);
    console.log(productData);
     res.status(201).json({ message: "Added WishList Sucessfully" });
  } catch (error) {
    console.log(error.messsage);
  }
});

const addCartDeleteWishlist =asyncHandler( async (req, res) => {
  try {
    const user = req.user;
    const productId = req.params.id;
    const userData = await User.findById({ _id: user._id });
    const productData = await Product.findById({ _id: productId });
    const add = await userData.addToCart(productData);
    if (add) {
      await userData.removefromWishlist(productId);
    }
    else{
      res.status(400).json({message:"Product wishlist failed "})
    }
     res.status(201).json({ message: "Added WishList Sucessfully" });
  } catch (error) {
    console.log(error.message);
  }
});

const deleteWishlist = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id;
    const user = req.user;
    const userData = await User.findById({ _id: user._id });
    await userData.removefromWishlist(productId);
     res.status(201).json({ message: "deleted WishList Sucessfully" });
  } catch (error) {
    console.log(error.message);
  }
});

const getwishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    console.log(userId);

    const wishlist = await User.findById({ _id: userId }).populate({
      path: "wishlist.item.productId",
    });
    console.log(wishlist);
    res.status(201).json(wishlist);
  } catch (error) {
    console.log(error);
  }
});

const getBanner = asyncHandler(async (req, res) => {
  try {
     console.log("user banner");
     const bannerList = await Banner.findOne({ isBlocked: false });
     console.log(bannerList);

     res.status(201).json(bannerList);
    
  } catch (error) {

    console.log(error);
     res.status(500).json({ message: error.message });
    
  }
 
});

////////////////order///////////////////////
const buildOrder = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { orderAddress, totalPrice, appliedCoupon, discount, paymentMethod } =
      req.body;

    console.log(orderAddress);
    console.log(totalPrice);
    console.log(appliedCoupon);
    console.log(discount);

    const completeUser = await user.populate("cart.items.productId");

    console.log(completeUser.cart);

    const order = await Order.create({
      userId: user._id,
      payment: paymentMethod,
      name: user.firstName,
      address: orderAddress.address,
      city: orderAddress.city,
      state: orderAddress.state,
      zip: orderAddress.zipCode,
      phone: user.mobile,
      products: completeUser.cart,
      couponApplied: appliedCoupon._id,
      discount: discount,
    });


     const productDetails = await Product.find();
     for (let i = 0; i < productDetails.length; i++) {
       for (let j = 0; j < order.products.items.length; j++) {
         if (productDetails[i]._id.equals(order.products.items[j].productId)) {
           productDetails[i].sales += order.products.items[j].qty;
           productDetails[i].qty -= order.products.items[j].qty;
         }
       }
       productDetails[i].save();
     }

     await Coupon.updateOne(
       { name: appliedCoupon.name },
       { $push: { usedBy: user._id } }
     );

    console.log(order);
  } catch (error) {
    // Handle and log the error
    console.error("An error occurred while creating the order:", error);
    // Return an error response to the client
    res.status(500).json({ message: "Failed to create the order" });
  }
});

///////////////////////////////////////////




module.exports = {
  registerUser,
  userLogin,
  getProduct,
  getSingletProduct,
  addToCart,
  getCart,
  userProfile,
  activateCoupon,
  updateUser,
  addAddress,
  deleteCart,
  pagination,
  getUser,
  editCart,
  addToWishlist,
  addCartDeleteWishlist,
  deleteWishlist,
  getwishlist,
  getBanner,
  buildOrder,
};
