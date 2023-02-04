const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post(
    "/doGrievance",
//     authController.protect,
//     authController.restrictTo("user"),
    userController.doGrievance
);
router.get(
    "/",userController.getAllUser
);
router.get(
    "/getAllUsers",
//     authController.protect,
//     authController.restrictTo("admin"),
    userController.getAllUser
);
router.get(
    "/grievance-users",
//     authController.protect,
//     authController.restrictTo("admin"),
    userController.getAllGrievanceUsers
);

module.exports = router;
