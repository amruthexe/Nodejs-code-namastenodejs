const express=require('express')
const bcrypt=require('bcrypt')
const  cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')
const User=require('./models/user')
const connectDB=require('./config/database')
const { userAuth } = require('./middleware/auth.js');

const authRouter=require('./routes/auth.js')
const proRouter=require('./routes/profile.js')
const reqRouter=require('./routes/request.js')
const app=express()
app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter);
app.use("/",proRouter);
app.use("/",reqRouter);
app.get('/user',async(req,res)=>{

    try{
        const users= await User.find({})
        res.send(users)

    }catch(err){
        console.error("Error in get Users")
        res.status(404).send("Error to get users")

    }
})


app.delete('/user',async(req,res)=>{
    try{
        const id=req.body.id;
        const d_user=await User.findByIdAndDelete(id);
        res.send("Deleted successfully");

    }catch(err){
        res.status(400).send("cant able to delete")
    }
})

app.patch('/user',async(req,res)=>{
try{
    const user= await User.findById(req.body.id );
    user.emailId="newemail@gmail.com";
    await user.save();
    res.send("Updated successfully");

}catch(err){
    res.status(404).send("update not performed");

}
    
})




// app.get("/profile", userAuth,async (req, res) => {
//     try {
//         const { token } = req.cookies;
//         if (!token) {
//             return res.status(401).send({ message: "No token provided. Unauthorized" });
//         }
//         const decoded = await jwt.verify(token, "Amruth");
//         // res.send({ message: "Token is valid", userData: decoded });
//         const user=await User.findById(decoded._id)
//         if(!user){
//             throw new Error("Invalid user not found")
//         }
//         res.send(user.firstName)
//     } catch (err) {
//         if (err.name === 'TokenExpiredError') {
//             res.status(401).send({ message: "Token has expired" });
//         } else if (err.name === 'JsonWebTokenError') {
//             res.status(401).send({ message: "Invalid token" });
//         } else {
//             res.status(400).send({ message: err.message });
//         }
//     }
// });



app.post("/sendconn",userAuth,(req,res)=>{
    res.send("send connection");
})
connectDB().then(()=>{
        console.log("connected")
    app.listen(3000,()=>{
        console.log("listening at 3000")
    })}
).catch((err)=>{
    console.error("Not Connected to Db")
})