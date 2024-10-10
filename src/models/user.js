const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:7,
        maxLenght:67,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        validate(v){
            if(!validator.isEmail(v)){
                throw new Error("its not correct mail")
            }
        }
    },password:{
        type:String,
        required:true,
    },gender:{
        type:String,
        enum:["male","female"]
        // validate(v){
        //     if(!["male","female","other"].includes(v)){
        //         throw new Error("gender wala error")
        //     }
        // }
    },
    age:{
        type:Number
    }
},{
    timestamps:true
});




userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"Amruth",{
        expiresIn:"7d"
    })
    return token
}

const User =mongoose.model("user",userSchema);

module.exports=User;






