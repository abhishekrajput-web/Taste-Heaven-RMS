import Category from "../mongodb/models/Category.js";
import slugify from 'slugify';

const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body;

        if (!name) {
           return res.status(401).json({message:"Name is Required"});
        }


        const existingUser = await Category.findOne({name});

        if (existingUser) {
           return res.status(200).json({message:"Category Already Registered", success:true});
        }

        const category = await new Category({
            name, slug:slugify(name)
        }).save();

        return res.status(201).json({message:"New Category Created", success:true, category});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message:"Error in Category",
        error,
        success:false }
        )
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
       const updatedCategory = await Category.findByIdAndUpdate(id,{name, slug:slugify(name)}, {new:true});
        return res.status(200).json({message:"Category updated successfully", success:true, updatedCategory});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message:"Error in updating Category",
        error,
        success:false
     }
        )
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        await Category.findByIdAndDelete(id);
        return res.status(200).json({message:"Category deleted successfully", success:true});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message:"Error in deleting Category",
        error,
        success:false
     }
        )
    }
}

const getSingleCategoryController = async (req, res) => {
    try {
        const {slug} = req.params;
        const category = await Category.findOne({slug:slug});
        return res.status(200).json({message:"get single category successfully", success:true, category});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message:"Error in getting single Category",
        error,
        success:false
     }
        )
    }
}

const getAllCategoryController = async (req, res) => {
    try {
        const category = await Category.find({});
        return res.status(200).json({message:"get all category successfully", success:true, category});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message:"Error in getting all Category",
        error,
        success:false
     }
        )
    }
}


export {createCategoryController, updateCategoryController, deleteCategoryController, getSingleCategoryController, getAllCategoryController};










