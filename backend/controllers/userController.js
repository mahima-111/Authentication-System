import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
const registerUser=async (req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        //check if user exists
        const userExists=await User.findOne({email: email});
        if(userExists){
            res.status(400);
            throw new Error('email is already in use');
        }
        const user= await User.create({name,email,password});
        if(user){
            generateToken(res,user._id);
            res.status(200).json({
                name: user.name,
                email: user.email,
                _id: user._id
            });
        }  
    }
    catch(err){
        next(err);
    }
}

const authUser=async (req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});

        if(user && (await user.matchPassword(password))){
            generateToken(res,user._id);
            res.status(200).json({
                name: user.name,
                email: user.email,
                _id: user._id
            });
        }
        else{
            res.status(404);
            throw new Error('invalid email or password');
        }

    }
    catch(err){
        next(err);
    }
}

const logoutUser=async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({message: 'user logged out'});
}

const getUser=async (req,res)=>{
    const {_id,name,email}=req.user;
    const user={
        _id,name,email
    }

    res.status(200).json(user);
}

const updateUser=async (req,res,next)=>{

    try{
        const {_id,email}=req.user;
        const data=req.body;
        const updatedEmail=data.email;
        if(email!==updatedEmail){
            const isDuplicate=await User.findOne({email: updatedEmail});
            if(isDuplicate){
                res.status(400);
                throw new Error('email id is already in use');
            }
        }
        const updatedUser=await User.findByIdAndUpdate(_id,data,{
            new:true,
            runValidators:true
        });
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    }
    catch(err){
        next(err);
    }
}

const updatePassword=async(req,res,next)=>{
    try{
        const {oldPassword,newPassword}=req.body;
        const {_id}=req.user;
        if(oldPassword===newPassword){
            res.status(400);
            throw new Error('new password cannot be same as old password');
        }
        const userData=await User.findById(_id);
        const isPrevMatch=await userData.matchPassword(oldPassword);
        if(!isPrevMatch){
            res.status(401);
            throw new Error('old password is wrong');
        }
        else{
            userData.password=newPassword;
            await userData.save();
            res.status(200).json({message: 'password reset successful'});
        }
    }
    catch(err){
        next(err);
    }
}

export {
    registerUser,authUser,logoutUser,getUser,updateUser, updatePassword
}