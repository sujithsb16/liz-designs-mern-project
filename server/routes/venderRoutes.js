const express = require("express");
const { registerVender, venderLogin, venderDetails, } = require("../controllers/venderController")

const router = express.Router();

router.route("/register").post(registerVender)
router.route("/signin").post(venderLogin)
router.route("/venderdetails").post(venderDetails)




module.exports = router