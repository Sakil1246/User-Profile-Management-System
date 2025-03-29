const User=require("../models/user");
const bcrypt=require("bcrypt");



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
            data:{
                name:user.name,
                email:user.email,
                photoUrl:user.photoUrl,
                bio:user.bio,
                address:user.address
            }
         })
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
    


}



//Api for update the password

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id; 

        const user = await User.findById({_id:userId});
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ error: "ERROR: " + err.message });
    }
};

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
module.exports={viewProfile,updateProfile,changePassword,deleteProfile};