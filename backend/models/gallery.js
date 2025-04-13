const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
 
  images: {
    type: [String],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("galleryimages", gallerySchema, "galleryimages");

