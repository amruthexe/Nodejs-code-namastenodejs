const express=require('express');
const reqRouter=express.Router();
const  cookieParser = require('cookie-parser')
const bcrypt=require('bcrypt');
const Connection=require('../models/connection.js')
const User=require('../models/user.js')

reqRouter.use(express.json())
reqRouter.use(cookieParser())
const { userAuth } = require('../middleware/auth.js');
const { connection } = require('mongoose');
reqRouter.post('/request/send/:status/:toUserId', userAuth, async(req, res) => {
   try{
const fromUserId=req.user._id;
const toUserId=req.params.toUserId;
const status=req.params.status;

const user=await User.findById(toUserId);
if(!user){
    return res.status(404).send({"message":"user not found in DB"});
}

const allowed=["interested","ignored"];
if(!allowed.includes(status)){
    return res.status(400).send({"message":`invalid request for connection ${status}`})
}

const exist= await Connection.findOne({
    $or:[{fromUserId, toUserId },{
        fromUserId:toUserId,toUserId:fromUserId
    }]

})
if(exist){
    return res.status(400).send({"message":"already request send !!! "})

}

const conn=new Connection({
    fromUserId,toUserId,status
});

const data=await conn.save()

res.json({
    "message":"successfully done connection",
    data
})


   }catch (err) {
    console.error("Error details: ", err);  // Log the full error object for debugging
    res.status(400).send("Error message: " + err.message);
}

});


reqRouter.post('./request/review/:status/:requestId',async (req,res)=>{
    const logged=req.user
    const {status,requestId}=req.params

    const allowed=["accpeted","rejected"]
    if(!allowed.includes(status)){
        throw new Error("you have to do accpet or reject another are performed")
    }

    const found=await Connection.findOne({
        _id:requestId,
        toUserId:logged._id,
        status:"interested",
    })
    if(!found){
        throw new Error("connection req not found");
    }
const data=await connection.save(   )
})

module.exports=reqRouter;