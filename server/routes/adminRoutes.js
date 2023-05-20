express = require("express");
const router = express.Router()


const { adminLogin, vendorList, userList, addCategory, getCategory, userStatusControl, vendorStatusControl, vendorVerifyControl, categoryStatusControl, getAdminProduct, productVerifyControl, productStatusControl, addCoupon, getCoupon, couponStatusControl, addBanner, getBanner, bannerStatusControl } = require("../controllers/adminController");

const { adminProtect } = require("../middlewares/authMiddleware");




router.route("/adminlogin").post(adminLogin);
router.route("/allvendors").get(adminProtect, vendorList);
router.route("/allusers").get(adminProtect, userList);
router.route("/verifyvendor/:id").patch(adminProtect, vendorVerifyControl);
router.route("/blockvendor/:id").patch(adminProtect, vendorStatusControl);
router.route("/blockuser/:id").patch(adminProtect, userStatusControl);
router.route("/blockcategory/:id").patch(adminProtect, categoryStatusControl);
router.route("/addcategory").post(adminProtect, addCategory );
router.route("/getcategory").get(adminProtect, getCategory );
router.route("/getproduct").get(adminProtect, getAdminProduct);
router.route("/verifyproduct/:id").patch(adminProtect, productVerifyControl);
router.route("/blockproduct/:id").patch(adminProtect, productStatusControl);
router.route("/addcoupon").post(adminProtect, addCoupon);
router.route("/getcoupon").get(adminProtect, getCoupon);
router.route("/blockcoupon/:id").patch(adminProtect, couponStatusControl);

router.route("/addbanner").post(adminProtect,addBanner);
router.route("/getbanner").get(adminProtect, getBanner );
router.route("/blockbanner/:id").patch(adminProtect, bannerStatusControl);






module.exports = router;