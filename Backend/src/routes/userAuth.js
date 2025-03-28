const express=require("express");
const userRouter=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");
const validateSignUp = require("../utils/validation");


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

module.exports = userRouter;
