const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      description: String,
      date: {
        type: Date,
        default: Date.now,
      },
      imageUrl: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},{ timestamps: true });

const Trip = mongoose.model("trip", tripSchema);

module.exports = Trip;