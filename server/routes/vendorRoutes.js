const express = require("express");
const { registerVendor, vendorLogin, vendorDetails, addProduct, getCategory, getVendorProduct, productStatusControl, getOrder, orderStatusControl, } = require("../controllers/vendorController");
const { vendorProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerVendor)
router.route("/login").post(vendorLogin)
router.route("/vendordetails").post(vendorDetails)
router.route("/addproduct").post(vendorProtect, addProduct);
router.route("/getcategory").get(vendorProtect, getCategory);
router.route("/getproduct").get(vendorProtect, getVendorProduct);
router.route("/blockproduct/:id").patch(vendorProtect, productStatusControl);

router.route("/getorders").get(vendorProtect, getOrder);
router.route("/orderstatus/:id").patch(vendorProtect, orderStatusControl);




module.exports = router