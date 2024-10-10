
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies
    if(!token){
        res.send("cookies not found")
    }else{
        const decode=await jwt.verify(token,"Amruth");
        const user=await User.findById(decode._id)
        if(!user){
            res.send("user not found")
        }
        req.user=user;
        // res.send(user.firstName);
        next()
    }
    }catch(err){
        res.send({message:err.message})

    }

}

module.exports={userAuth};
