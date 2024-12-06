import express from "express";
import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, getOrderStatusController } from "../config/authController.js";
import {requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

// routing
// register || post method

router.post("/register", registerController);

// login || post method
router.post("/login", loginController);

// forgot password || post method
router.post("/forgot-password", forgotPasswordController);

// jwt || get method test

router.get("/test", requireSignIn, isAdmin,  testController);

// user auth protect routes || dashboard
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).json({ok: true});
});

// admin auth protect routes || admin dashboard
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).json({ok: true});
});

// admin auth protect routes || admin dashboard
router.put("/user-profile", requireSignIn, updateProfileController);


// user orders
router.get("/orders", requireSignIn, getOrdersController);


// get all admin orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);


// change order status
router.put("/order-status/:orderId", requireSignIn, isAdmin, getOrderStatusController);

export default router;


