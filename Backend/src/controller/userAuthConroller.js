const express=require("express");
const userRouter=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");
const validateSignUp = require("../utils/validation");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();



//Api for signUp
  const signUp=async(req,res)=>{
    try{
    const validationError=validateSignUp(req);
    if(validationError){
        return res.status(400).json({error:validationError.error});
    }
    const {name,email,password}=req.body;
    const isExist=await User.findOne({email:email});
    if(isExist){
        return res.status(400).json({ error: "Email already exists! Please Sign In" });
    }
    const hashPassword=await bcrypt.hash(password,10);
    const user=new User({
        name,
        email,
        password:hashPassword
    })

    const data=await user.save();
    //console.log(data);
    const userId=data._id;
    const token=jwt.sign({_id:userId},process.env.JWT_SECRET_KEY);
    res.cookie("token",token,{ expires: new Date(Date.now() + 8 * 3600000) });

    res.status(201).json({
        message:"User created successfully",
        data:{

            // Sending back filtered user data so that the UI developer can
            // store it in and use it to display in the UI

            name:data.name,
            email:data.email,
            photoUrl:data.photoUrl,
            bio:data.bio,
            address:data.address,
        }

    });
    }
    catch(err){
        //console.log(err);
        res.status(400).json({ error: "ERROR: " + err.message });
    }
}


//Api for sign in
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error:"Invalid credentials"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({error:"Invalid credentials"});
        }
        //const userId=user._id.toString();
        //console.log(userId);
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY);
        res.cookie("token",token,{ expires: new Date(Date.now() + 8 * 3600000) });
        res.status(200).json({
            message:" logged in successfully",
            data:{

                // Sending back filtered user data so that the UI developer can
                // store it in and use it to display in the UI
               
                name:user.name,
                email:user.email,
                photoUrl:user.photoUrl,
                bio:user.bio,
                address:user.address,
            }
        });

    }
    catch(err){
        //console.log(err);
        res.status(400).json({ error: "ERROR: " + err.message });
    }
}



//Api for sign out
const logout=async(req,res)=>{
    try{
        res.cookie("token",null,{ expires: new Date(Date.now()) });
        res.send("logout successfully");
    }catch(err){
        //console.log(err);
        res.status(400).json({ error: "ERROR: " + err.message });
    }
}
module.exports = {signUp,login,logout};
