import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect=async (req,res,next)=>{
    const token=req.cookies.jwt;
    // console.log(token);

    try{
        if(token){
            try{
                const decoded=jwt.verify(token,process.env.JWT_SECRET);
                req.user=await User.findById(decoded.userId).select('-password');
                next();
            }
            catch(err){
                res.status(401);
                throw new Error('unauthorized, invalid token');
            }
        }
        else{
            res.status(401);
            throw new Error('not authorized, no token');
        }
    }
    catch(err){
        next(err);
    }
}

export {protect};