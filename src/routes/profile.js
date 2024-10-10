const express=require('express');
const proRouter=express.Router();
const  cookieParser = require('cookie-parser')
const bcrypt=require('bcrypt');
const User=require('../models/user')
proRouter.use(express.json())
proRouter.use(cookieParser())
const { userAuth } = require('../middleware/auth.js');
proRouter.get('/profile', userAuth, (req, res) => {
    res.send(`Welcome, ${req.user.firstName}`);
});


module.exports=proRouter;