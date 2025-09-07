import jwt from "jsonwebtoken";

import User from "../modules/User.js";

export async function authMiddleware(req,res,next) {
    const token=req.headers["authorization"]?.split(" ")[1];
    if(!token) return res.status(401).json({
        error:"User not authorized",
    })

   try{
     const decoded=jwt.decode(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
   }
   catch(err)
   {
    res.status(400).json({
        err:err.message
    })
   }
    
}