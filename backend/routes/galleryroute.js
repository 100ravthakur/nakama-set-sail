const express = require("express");
const router = express.Router();
const Gallery = require("../models/gallery");
const upload = require("../middleware/gallery");
const authenticateToken = require("../middleware/users");
const upload = require("../middleware/cloudinary");

router.post("/",authenticateToken, upload.array("images", 12), async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => `/uploads/gallery/${file.filename}`);

    if (imagePaths.length > 12) {
        return res.status(400).json({ error: "You can upload up to 12 images only." });
    }


    const newGallery = new Gallery({user: req.user.userid, images: imagePaths });
    const saveimages = await newGallery.save();
    res.status(201).json(saveimages);
  } catch (error) {
    console.log(error);
  }
});

router.get('/',authenticateToken, async (req, res) => {
    try {
        
       const galleries = await Gallery.find({ user: req.user.userid});
       res.json(galleries)
    } catch (error) {
        console.log("error while fetching images",error);
        
    }
    
});

module.exports = router;