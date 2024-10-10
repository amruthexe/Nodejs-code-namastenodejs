const express=require('express');
const authRouter=express.Router();
const  cookieParser = require('cookie-parser')
const bcrypt=require('bcrypt');
const User=require('../models/user')
authRouter.use(express.json())
authRouter.use(cookieParser())
const { userAuth } = require('../middleware/auth.js');
authRouter.post("/signup",async(req,res)=>{

    const {password}=req.body
    const epass=await bcrypt.hash(password,10)
    req.body.password=epass
const user =new User(req.body)

try{
    await user.save();
    res.send("data Successfully added")

}catch(err){
    res.status(400).json({  error:err.message});
}

})

authRouter.post("/login",async(req,res)=>{
    try{

        const {emailId,password}=req.body;
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("invalid password");

        }else{
            const Check=await bcrypt.compare(password,user.password);
            if (Check){
                const token= await user.getJWT()
                res.cookie("token",token)
                res.send("login successfull")
            }else{
                res.status(404).send("invalid");
            }

        }

    }catch(err){
        res.status(400).send({message:err.message})
    }
})


authRouter.post("/logout",(req,res)=>{
    res.clearCookie("token");
    res.send("your are loggout");
})

module.exports=authRouter;