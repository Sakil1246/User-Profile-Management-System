const express=require("express");
const profileRouter=express.Router();
const authUser=require("../middlewares/auth");
const { viewProfile, updateProfile, deleteProfile } = require("../controller/profileController");

profileRouter.get("/user/viewProfile",authUser,viewProfile);
profileRouter.patch("user/updateProfile",authUser,updateProfile);
profileRouter.delete("/user/deleteProfile",authUser,deleteProfile);

module.exports=profileRouter;