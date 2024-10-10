const mongoose=require("mongoose");

const connection=new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }
    ,toUserId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
    },status:{
        type:String,
        required:true,
        enum:{values:["ignored","rejected","accpeted","interested"],
        message:`{VALUE} is incorrect`} 
    }
},{
    timestamps:true
})


connection.pre("save",function(next){
    const collectionq=this;
    if(collectionq.toUserId.equals(collectionq.fromUserId)){
        throw new Error("from and to are same")
    }next();

})


module.exports=new mongoose.model("Connection",connection)