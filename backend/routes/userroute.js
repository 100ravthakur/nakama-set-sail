const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authRoutes = require("../routes/userroute");


router.post('/register', async (req, res) => {
   
    const {email, password, username, name, description} = req.body

    try {
        const hash =await bcrypt.hash(password, 10);
        const user = new User({email, name, username, description, password:hash})
        await user.save()
        res.status(201).json("created")
        
    } catch (error) {
        console.log(error);
        
    }
 
})


router.post('/login', async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email});
        if (!user) {
          return  res.status(404).json("not found")
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(404).json("not found")
        }
        else{
        const token = jwt.sign( { sub: user._id, userid: user._id },process.env.JWT_SECRET,{expiresIn:"1d"});
        res.json({token});
        }

    }
     catch (error) {
        console.log(error);
        
    }
})

module.exports = router;