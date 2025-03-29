const User=require("../models/user");




//Api for view the profile
const viewProfile=async(req,res)=>{
try{
    const user=req.user;
    const {name,email,photoUrl,bio,address}=user;
    res.status(200).json({
        message:"User profile",
        data:{
            name,
            email,
            photoUrl,
            bio,
            address
        }
    })
}catch(err){
    res.status(400).send("Error: " + err.message);
}    

}


//Api for update the profile
const updateProfile=async(req,res)=>{
    try{
        const allowedField=["name","photoUrl","bio","address"];
        //A separete api for changing password will be there
        const isAllowed=Object.keys(req.body).every((field)=>allowedField.includes(field));
        if(!isAllowed){
            return res.status(400).json({message:"Invalid update request field"});
        }
        const user=req.user;
       Object.keys(req.body).forEach((update)=>user[update]=req.body[update]);
         await user.save();
         res.status(200).json({
            message:"User profile updated successfully",
            data:user
         })
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
    


}


//Api for delete the profile

const deleteProfile=async(req,res)=>{
    try{
        const user=req.user;
        const userId=user._id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({message:"User profile deleted successfully"});
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
}
module.exports={viewProfile,updateProfile,deleteProfile};