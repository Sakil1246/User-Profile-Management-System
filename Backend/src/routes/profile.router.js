const express=require("express");
const profileRouter=express.Router();
const authUser=require("../middlewares/auth");
const { viewProfile, updateProfile, deleteProfile, changePassword } = require("../controller/profileController");

profileRouter.get("/user/viewProfile",authUser,viewProfile);
profileRouter.patch("/user/updateProfile",authUser,updateProfile);
profileRouter.patch("/user/changePassword",authUser,changePassword);
profileRouter.delete("/user/deleteProfile",authUser,deleteProfile);

module.exports=profileRouter;