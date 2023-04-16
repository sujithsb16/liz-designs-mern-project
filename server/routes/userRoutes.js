const express = require("express");
const { registerUser, verifyUser } = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(verifyUser);

module.exports = router;
