import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../mongodb/models/User.js";
import JWT from "jsonwebtoken";
import Order from '../mongodb/models/Order.js';

const registerController = async (req, res) => {

    try{
        const { name, email, password, phone, address} = req.body;

        if (!name) {
            return res.json({ message: "Name is required" });
        }
    
        if (!email) {
            return res.json({ message: "Email is required" });
        }
    
        if (!password) {
            return res.json({ message: "password is required" });
        }
    
        if (!phone) {
            return res.json({ message: "Phone is required" });
        }
    
        if (!address) {
            return res.json({ message: "Address is required" });
        }
    
        const existingUser = await User.findOne({ email: email });
    
        if (existingUser) {
           return res.status(200).json({
                message: "Already a Register User. Please Login !",
                success: true
            });
        }
    
        const hashedPassword = await hashPassword(password);
    
        // create new user or register new user
    
        const user = await new User({ name, email, address, phone, password: hashedPassword }).save();
        res.status(200).json({
            success: true,
            message: "user is registered successfully",
            user,
        });
    
    }

    catch(error){
        console.log(error);
         res.status(500).json({
            success: false,
            message: "Error in registration",
            error,
        });

    }

    

}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"invalid email or password",
            });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "email is not registered",
            })
        }

        const matchPassword = await comparePassword(password, user.password);

        if (!matchPassword) {
            return res.status(200).json({
                success:false,
                message:"Invalid Password"
            });
        }

        // token jwt for successfull login

        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.status(200).json({
            success:true,
            message:"Login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                // question:user.question,
                role:user.role,
                _id:user._id,
            },
            token,
        });
    
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Error in login",
            err
        })
    }

}

const testController = (req, res) => {
 res.status(200).json({
    message:"routes is required",
    success:true,
})
// console.log("routes protected");
}

const forgotPasswordController = async (req, res) => {

    try {
        const { email, newPassword} = req.body;

        if (!email) {
            return res.json({ message: "Email is required" });
        }

        if (!newPassword) {
            return res.json({ message: "New Password is required" });
        }
        
        const user = await User.findOne({email});

        if (!user) {
           return res.status(404).json({
                message:"Wrong Email",
                success:false,
            });
        }

        const hashedPassword = await hashPassword(newPassword);

        await User.findByIdAndUpdate(user._id, {password: hashedPassword});

        res.status(200).json({
            message:"password change successfully",
            success:true,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"something went wrong",
            success:false,
            error: error.message,
        });
    }

}


// update profile

const updateProfileController = async (req, res) => {
    try {
      const { name, email, address, phone } = req.body;
      const user = await User.findById(req.user._id);
  
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          email:email || user.email,
        //   password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };


  // user orders
 const getOrdersController = async (req, res) => {
    try {
      const orders = await Order
        .find({ buyer: req.user._id })
        .populate("products")
        .populate("buyer", "name");
      res.status(200).json({success:true, orders });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  

//   get all orders admin

const getAllOrdersController = async (req, res) => {
try {
    const orders = await Order
    .find({})
    .populate("products")
    .populate("buyer", "name")
    .sort({createdAt: "-1"})
     res.status(200).json({success:true, orders });
} catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: "Error WHile Geting all admin Orders",
        error,
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
    

export { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, getOrderStatusController};

