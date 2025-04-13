const express = require("express");
const Trip = require("../models/trips");
const router = express.Router();
const upload = require("../middleware/upload");
const authenticateToken = require("../middleware/users");


router.post("/",authenticateToken, upload.single("image"), async (req, res) => {
  try {
    const newtrip = new Trip({title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
        user: req.user.userid,
      });
    const saveTrip = await newtrip.save();
    res.status(201).json(saveTrip);
  } catch (error) {
    console.log("error 404 not found", error);
  }
});

router.get("/",authenticateToken, async (req, res) => {
  try {
    const trips = await Trip.find({user: req.user.userid}).sort({createdAt: -1});
    res.json(trips);
  } catch (error) {
    console.log("erro while feching the data", error);
  }
});

router.get('/:id',authenticateToken, async (req, res) => {
    
    const trip = await Trip.findById({ _id: req.params.id, user: req.user.userid }).lean();
    if (!trip) {
        return res.status(403).json({ message: "Unauthorized to access this trip" });
        
    }
    res.status(200).json(trip);
})

router.put('/:id', authenticateToken, upload.single("image"), async (req, res) => {
    try {

        const trip = await Trip.findOne({ _id: req.params.id, user: req.user.userid });
    if (!trip) return res.status(403).json({ message: "Not allowed to update this trip" });
       
            trip.title= req.body.title
            trip.location= req.body.location
            trip.description= req.body.description        
        
          if (req.file) {
            trip.imageUrl = req.file.filename;
          }

         const updatedTrip =  await trip.save();
          res.status(200).json(updatedTrip);
    } catch (error) {
        console.log("error while geting data",error);
        
    }
})

router.delete('/:id',authenticateToken, async (req, res) => {
    try {


         const deleteTrip =  await Trip.findByIdAndDelete({ _id: req.params.id, user: req.user.userid });
          res.status(200).json(deleteTrip);
    } catch (error) {
        console.log("error while geting data",error);
        
    }
})

module.exports = router;