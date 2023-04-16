express = require("express");
const router = express.Router()
const { adminLogin, venderList, verifyVender, blockVender, userList, blockUser } = require("../controllers/adminController");

const { protect } = require("../middlewares/authMiddleware");




router.route("/adminlogin").post(adminLogin);
router.route("/allvenders").get(protect, venderList);
router.route("/allusers").get(protect, userList);
router.route("/verifyvender/:id").patch(protect, verifyVender);
router.route("/blockvender/:id").patch(protect, blockVender);
router.route("/blockuser/:id").patch(protect, blockUser);

module.exports = router;