const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../middleware/users");


    
    router.get('/profile', authenticateToken, async (req, res) => {
        try {
          const user = await User.findById(req.user.sub || req.user.userid);

      
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          res.json({
            username: user.username,
            email: user.email,
            name: user.name,
            description: user.description,
            profileImage: user.profileImage,
            password: "********"
          });
          
        } catch (error) {
          console.error("Error in profile route:", error);
          res.status(500).json({ error: "Something went wrong." });
        }
      });
      
      

module.exports = router;