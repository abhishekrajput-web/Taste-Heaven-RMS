import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
    unique:true
},




// categoryPhoto:{
//     type:String,
//     required:true
// },



slug:{
    type:String,
    lowercase:true
},

});


const Category = mongoose.model("Category", categorySchema);

export default Category;

   // data.newImage = {
            //     public_id: newImage.public_id,
            //     url: newImage.secure_url
            // }
