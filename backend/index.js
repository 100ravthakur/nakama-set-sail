const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Trip = require('./models/trips');
const galleryRoutes = require("./routes/galleryroute");
const path = require('path')
const authRoutes = require("./routes/userroute");
const profileRoute = require("./routes/profileroute");
const authenticateToken = require("./middleware/users");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Error:", err));


// Trip.create({
//   title: "Test Trip",
//   location: "Paris",
//   description: "This is a test trip to Paris"
// })
// .then(trip => console.log("Trip created:", trip))
// .catch(err => console.error("Trip creation failed:", err));

const tripRoutes = require(path.join(__dirname, "./routes/triproute"));
app.use("/api/auth", authRoutes);
app.use("/api/trips", authenticateToken, tripRoutes);
app.use("/api/gallery", authenticateToken, galleryRoutes);
app.use("/api",authenticateToken, profileRoute);
app.use("/uploads", express.static("/public/uploads"));


app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend!" });
  });
  

  
//   app.use('/', require(path.join(__dirname, './routes/triproute')))
 
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });