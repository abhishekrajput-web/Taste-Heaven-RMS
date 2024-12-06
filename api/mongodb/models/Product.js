import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
},

slug:{
    type:String,
    required:true,
},

description:{
    type:String,
    required:true,
},

price:{
    type:Number,
    required:true,
},

category:{
    type:mongoose.ObjectId,
    ref:"Category",
    required:true,
},

quantity:{
    type:Number,
    default:1,
    required:true
},


//for mongodb image base64 
// photo:{
//     data:Buffer,
//     contentType:String
// },


photo:{
    type:String,
    required:true
},


// for cloudinary
// photo: {
//     public_id: {
//         type: String,
//         required: true
//     },
//     url: {
//         type: String,
//         required: true
//     }

// },



// shipping:{
//     type:Boolean,
// },


}, {timestamps:true});


const Product = mongoose.model("Product", productSchema );

export default Product;