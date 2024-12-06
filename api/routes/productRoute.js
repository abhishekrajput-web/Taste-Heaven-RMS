import express from "express";
import {createProductController, updateProductController, deleteProductController, getAllProductController, getSingleProductController, getPhotoController, productFiltersController, productCountController,  productListController, productSearchController, relatedProductController, productCategoryController, braintreePaymentController, braintreeTokenController, getOrderStatusController} from "../config/productController.js";
import {requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
// import fileUpload from "express-fileupload";
const router = express.Router();

// routing
// create product
// router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);
router.post("/create-product", requireSignIn, isAdmin, createProductController);

// update product
// router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController);
router.put("/update-product/:pid", requireSignIn, isAdmin, updateProductController);


// delete product
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController);

// get all product
router.get("/get-product", getAllProductController);

// get single product
router.get("/single-product/:slug",getSingleProductController);


// get single photo
router.get("/product-photo/:pid", getPhotoController);

//filter product
router.post("/product-filters", productFiltersController);

//filter product
// router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

// search product using keywords
router.get("/search/:keyword", productSearchController);

// similar products
router.get("/related-product/:pid/:cid", relatedProductController);

// get single product category
router.get("/product-category/:slug", productCategoryController);

// payments routes
// token
router.get("/braintree/token", braintreeTokenController);

// // payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);



// // // user orders
router.put("/order-status/:orderId", requireSignIn, isAdmin, getOrderStatusController);


export default router;