import Product from "../mongodb/models/Product.js";
import Category from "../mongodb/models/Category.js";
import Order from "../mongodb/models/Order.js";
import dotenv from "dotenv";
import slugify from 'slugify';
import { v2 as cloudinary } from "cloudinary";
import braintree from "braintree";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHENT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


const createProductController = async (req, res) => {

    try {

     
        const { name, description, price, category, photo } = req.body;


        // validation
        switch (true) {
            case !name:
                return res.status(500).json({ message: "Name is Required" })
            case !description:
                return res.status(500).json({ message: "Description is Required" })
            case !price:
                return res.status(500).json({ message: "Price is Required" })
            case !category:
                return res.status(500).json({ message: "Category is Required" })
            // case !quantity:
            //     return res.status(500).json({ message: "Quantity is Required" })
            case photo && photo.size > 1000000:
                return res.status(500).json({ message: "Photo Is Required and should be less then 1mb" })
        }



        //  mongodb main code only save


        const products = new Product({
            ...req.body, slug: slugify(req.body.name)
        });
        await products.save();
        res.status(200).json({ message: "New Product Created Successfully", success: true, products })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in Product",
            error,
            success: false
        }
        )
    }
}

const updateProductController = async (req, res) => {
    try {
        // const { name, slug, description, price, category, quantity, shipping, } = req.fields;

        const {pid} = req.params;
        const products = await Product.findByIdAndUpdate(pid, {...req.body, slug:slugify(req.body.name)}, {new:true});
        await products.save();
        res.status(200).json({ message: "New Product Created Successfully", success: true, products })    

    }



    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in Updating Product",
            error,
            success: false
        }
        )
    }
    
    }

 
   





const deleteProductController = async (req, res) => {
    try {

        // mongodb code
        const { pid } = req.params;
        await Product.findByIdAndDelete(pid);
        return res.status(200).json({ message: "Product deleted successfully", success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in deleting Product",
            error,
            success: false
        }
        )
    }
}

const getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params;
        const singleProduct = await Product.findOne({ slug: slug }).populate("category");
        // const singleProduct = await Product.findOne({slug:slug}).select("-photo").populate("category");
        return res.status(200).json({ message: "get single Product successfully", success: true, singleProduct });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in getting single Product",
            error,
            success: false
        }
        )
    }
}

const getAllProductController = async (req, res) => {
    try {
        const products = await Product.find({}).populate("category").limit(12).sort({ createdAt: -1 });
        // const products = await Product.find({}).populate("category").select("-photo").limit(12).sort({createdAt: -1});
        return res.status(200).json({ message: "get all Product successfully", success: true, products, totalCount: products.length });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in getting all Product",
            error,
            success: false
        }
        )
    }
}

const getPhotoController = async (req, res) => {
    try {
        const productPhoto = await Product.findById(req.params.pid).select("photo");
        if (productPhoto.photo.data) {
            res.set("Content-type", productPhoto.photo.contentType);
        }
        return res.status(200).json({ message: "get Product photo successfully", success: true, productPhoto: productPhoto.photo.data });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in getting Product photo",
            error,
            success: false
        }
        )
    }
}


// get filter product
const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await Product.find(args);
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Error in getting filter all Product",
            error,
            success: false
        }
        )
    }

}

// product count
const productCountController = async (req, res) => {
    try {
        const total = await Product.find({}).estimatedDocumentCount();
        res.status(200).json({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false, error, message: "Error in product count",
        })
    }
}

// product list base on page
const productListController = async (req, res) => {
    try {
        const perPage = 3;
        const page = req.params.page ? req.params.page : 1;
        const products = await Product.find({}).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false, error, message: "Error in per page",
        })
    }
}

// search product using keywords
const productSearchController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        })
        res.status(200).json({
            success: true,
            results
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false, error, message: "Error in search product",
        })
    }
}


// get related product
const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await Product.find({
            category: cid, _id: { $ne: pid }
        }).limit(3).populate("category");
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false, error, message: "Error in related product",
        })
    }
}


// get product category single

const productCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug: slug });
        const products = await Product.find({ category: category }).populate("category");
        res.status(200).json({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false, error, message: "Error in product category",
        })
    }
}


// stripe payment

const stripePaymentController = async (req, res) => {

    //     try {
    //     const { cart } = req.body;
    //     console.log(nonce);
    //     let total = 0;
    //     cart.map((p) => {
    //         total = total + p.price;
    //     })
    //     let newTransaction = gateway.transaction.sale({
    //         amount: total,
    //         paymentMethodNonce: nonce,
    //         options: {
    //             submitForSettlement: true,
    //         }
    //     }, function (error, result) {
    //         if (result) {
    //             const order = new Order({
    //                 products: cart,
    //                 payment: result,
    //                 buyer: req.user._id
    //             }).save();
    //             res.status(200).json({ ok: true });
    //         }
    //         else {
    //             res.status(500).json(error)
    //         }
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(400).json({
    //         success: false, error, message: "Error in product category",
    //     })
    // }
     try {
        const {cart, token } = req.body;
        console.log("cart",cart);
               let total = 0;
        cart.map((p) => {
            total = total + p.price;
        })
        // console.log("Price",product.price);
        // To avoid duplication for payments
        const idempotencyKey = uuidv4();
        return Stripe.customers.create({
        email:token.email,
        source:token.id
        })
        .then(customer =>{
        Stripe.charges.create({
        amount: total,
        currency:'usd',
        customer:customer.id,
        receipt_email: token.email,
        description: `purchase of $(product.name)`,
        shipping: {
        name: token.card.name,
        address:{
        country:token.card.address_country
        }
        }
        },{idempotencyKey})})
        .then(result => res.status(200).json(result))
        .catch(err => {console.log(err)})
     } catch (error) {
               console.log(error);
        res.status(400).json({
            success: false, error, message: "Error in product category",
        })
     }




}



// payment token

const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json(response);
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}



// payment route

const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        console.log(nonce);
        let total = 0;
        cart.map((p) => {
            total = total + p.price;
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            // merchantAccountId: process.env.BRAINTREE_MERCHENT_ID, // for inr merchent account oprinal for inr
            options: {
                submitForSettlement: true,
            },
            // currencyIsoCode: "INR",
        }, function (error, result) {
            if (result) {
                const order = new Order({
                    products: cart,
                    payment: result,
                    buyer: req.user._id
                }).save();
                res.status(200).json({ ok: true });
            }
            else {
                res.status(500).json(error)
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false, error, message: "Error in product category",
        })
    }
}






// order status changes

const getOrderStatusController = async (req, res) => {
try {
    const {orderId} = req.params;
    const {status} = req.body;
    const orders = await Order.findByIdAndUpdate(orderId, {status}, {new:true});
    res.status(200).json({
        success: true, orders,
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        success: false, error, message: "Error in update order",
    })
}
}

export { createProductController, updateProductController, deleteProductController, getSingleProductController, getAllProductController, getPhotoController, productFiltersController, productCountController, productListController, productSearchController, relatedProductController, productCategoryController, braintreePaymentController, braintreeTokenController,getOrderStatusController  };

