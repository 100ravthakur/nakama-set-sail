const express = require("express");
const router = express.Router();
const Gallery = require("../models/gallery");
const upload = require("../middleware/gallery");
const imagekit = require("../utills/imagekit");
const authenticateToken = require("../middleware/users");

router.post(
  "/",
  authenticateToken,
  upload.array("images", 12),
  async (req, res) => {
    try {
      let imageUrls = [];
      if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedImage = await imagekit.upload({
          file: file.buffer,
          fileName: file.originalname,
          folder: "gallery_uploads",
        });

        imageUrls.push(uploadedImage.url);
      }
      
    }

      if (imageUrls.length > 12) {
        return res
          .status(400)
          .json({ error: "You can upload up to 12 images only." });
      }

      const newGallery = new Gallery({
        user: req.user.userid,
        images: imageUrls,
        
      });
      
      const saveimages = await newGallery.save();
      res.status(201).json(saveimages);
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/", authenticateToken, async (req, res) => {
  try {
    const galleries = await Gallery.find({ user: req.user.userid });
    res.json(galleries);
  } catch (error) {
    console.log("error while fetching images", error);
  }
});

module.exports = router;
