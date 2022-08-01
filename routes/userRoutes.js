
const userController = require("../controllers/userController");

// ************* In userRouter.js   *************
const express = require("express");
// reqquire the authController
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);  
router.post("/login", authController.login);

router  
    .route("/allUsers")
    .get(userController.getAllUsers);

module.exports = router;







   



























