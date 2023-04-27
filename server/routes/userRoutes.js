const express = require("express");
const { registerUser, userLogin, getProduct, getSingletProduct, addToCart, getCart } = require("../controllers/userControllers");
const {  userProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/getproducts").get(getProduct);
router.route("/singleproduct/:id").get(getSingletProduct);
router.route("/addtocart/:id").get(userProtect, addToCart);
router.route("/getcart").get(userProtect,getCart);


module.exports = router;
