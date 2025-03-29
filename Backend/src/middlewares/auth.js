const User=require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv=require("dotenv");
dotenv.config();


//this is request handler
const authUser=async(req,res,next)=>{
//this auth middleware is for authenticate the user by verifying the token
//and finding the user in the database
try{
const {token}=req.cookies;
if(!token){
    return res.status(401).json({message:"Token invalid,please login"});
}
const decodeToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
const {_id} =decodeToken; 
const user=await User.findById(_id);
if(!user){
    throw new Error("User not found");
}
req.user=user;
//console.log(user);
next();
}catch(err){
return res.status(400).send("Error: " + err.message);

}

}

module.exports=authUser;