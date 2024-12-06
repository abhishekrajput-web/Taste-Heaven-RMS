import JWT from "jsonwebtoken";
import User from "../mongodb/models/User.js";
// protected routes token based
const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }

    catch (err) {
        console.log(err);
        res.json(err);
    }

}

// admin access 
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).json({
                success: false,
                message: "unAuthorized Access"
            })
        }
        else {
            next();
        }

    } catch (error) {
        console.log(error);
         res.status(401).json({
            success: false,
            error,
            message: "Error in admin middleware"
        })
    }


}

export { requireSignIn, isAdmin };

