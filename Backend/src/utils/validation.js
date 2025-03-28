const validator=require("validator");
const validateSignUp= (req)=>{
    const {name,email,password}=req.body;
    const validEmail=validator.isEmail(email);
    if(!validEmail){
        return {error:"Email  is not valid"};
    }
    const strongPassword=validator.isStrongPassword(password);
    if(!strongPassword){
        return {error:"Password is not strong"};
    }
    if(!name){
        return {error:"Name cannot be empty"};
    }
    if(name.length <2 || name.length >20){
        return {error:"Name must be in between 2 and 20 characters"};
    }
    return null;


}

module.exports=validateSignUp;