const express=require("express");
const userRouter=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");
const validateSignUp = require("../utils/validation");
const jwt=require("jsonwebtoken");


userRouter.post("/user/signUp",async(req,res)=>{
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
    console.log(data);
    const userId=data._id;
    const token=jwt.sign(userId,"user@manaage");
    res.cookie("token",token);

    res.status(201).json({
        message:"User created successfully",
        data:data
    });
    }
    catch(err){
        //console.log(err);
        res.status(400).json({ error: "ERROR: " + err.message });
    }
})

userRouter.post("/user/login",async(req,res)=>{
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
        const userId=user._id.toString();
        //console.log(userId);
        const token=jwt.sign(userId,"user@manaage");
        res.cookie("token",token);
        res.status(200).json({
            message:"User logged in successfully",
            data:user
        });

    }
    catch(err){
        //console.log(err);
        res.status(400).json({ error: "ERROR: " + err.message });
    }
})

module.exports = userRouter;
