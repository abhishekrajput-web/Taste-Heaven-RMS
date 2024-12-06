// import express from "express";
// import {createCategoryController, updateCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController} from "../config/categoryController.js";
// import {requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
// import upload from "../middlewares/multer.js";
// const router = express.Router();

// // routing
// // create category
// router.post("/create-category", requireSignIn, isAdmin, upload.single("categoryImg"), createCategoryController);

// // update category
// router.put("/update-category/:id", requireSignIn, isAdmin,  upload.single("categoryImg"), updateCategoryController);

// // delete category
// router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

// // get all category
// router.get("/get-category", getAllCategoryController);

// // get all category
// router.get("/single-category/:slug",getSingleCategoryController);

// export default router;


import express from "express";
import {
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
    getAllCategoryController,
    getSingleCategoryController
} from "../config/categoryController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// Routing
// Create category
router.post("/create-category", requireSignIn, isAdmin, upload.single("categoryImg"), createCategoryController);

// Update category
router.put("/update-category/:id", requireSignIn, isAdmin, upload.single("categoryImg"), updateCategoryController);

// Delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

// Get all categories
router.get("/get-category", getAllCategoryController);

// Get single category by slug
router.get("/single-category/:slug", getSingleCategoryController);

export default router;

