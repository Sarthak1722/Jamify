import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({quiet: true});

const isAuthenticated = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "User not Authenticated."})
        };
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY); // decode = tokenData
        if(!decode){
            return res.status(401).json({message: "Invalid Token."})
        };
        // console.log(decode);
        req.id = decode.userID;
        req.user = { _id: decode.userID }; // Add req.user for compatibility
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({message: "Authentication failed."});
    }
};

export default isAuthenticated;