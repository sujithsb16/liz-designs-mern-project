const express = require("express");
const { registerUser, userLogin, getProduct, getSingletProduct, addToCart, getCart, activateCoupon, updateUser, userProfile, addAddress, deleteCart, pagination, getUser, editCart, addToWishlist, getwishlist, deleteWishlist, addCartDeleteWishlist, getBanner, buildOrder, cancelOrder, payment, deleteAddress, getOrderDetails } = require("../controllers/userControllers");
const {  userProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/updateuser").patch(userProtect,updateUser);
router.route("/addaddress").patch(userProtect, addAddress);
// router.route("/getproducts").get(getProduct);
router.route("/singleproduct/:id").get(getSingletProduct);
router.route("/addtocart/:id").get(userProtect, addToCart);
router.route("/editcart/:id").patch(userProtect, editCart);

router.route("/deletecart/:id").get(userProtect, deleteCart);
router.route("/getcart").get(userProtect,getCart);
router.route("/userprofile").get(userProtect, userProfile);
router.route("/getuser").get(userProtect, getUser);
router.route("/couponactivate/:couponId").patch(userProtect, activateCoupon);

router.route("/getproducts/:page/:limit").get( pagination);

router.route("/addtowishlist/:id").get(userProtect, addToWishlist);
router.route("/getwishlist").get(userProtect, getwishlist);
router.route("/deletewishlist/:id").get(userProtect, deleteWishlist);
router.route("/getorderdetials/:id").get(userProtect, getOrderDetails);
router.route("/deleteaddress/:id").delete(userProtect, deleteAddress);
router
  .route("/deletewishlistaddtocart/:id")
  .get(userProtect, addCartDeleteWishlist);


  router.route("/getbanner").get(getBanner);

  router.route("/orderproduct").post(userProtect, buildOrder);
router.route("/cancelorder/:id").patch(userProtect, cancelOrder);

router.route("/payment/create").post( payment);






module.exports = router;
