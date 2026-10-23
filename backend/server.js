 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    passengerName: {
      type: String,
      required: true,
      trim: true,
    },

    bookingType: {
      type: String,
      required: true,
      enum: ["flight", "hotel", "cab"],
    },

    from: {
      type: String,
      default: "",
      trim: true,
    },

    to: {
      type: String,
      default: "",
      trim: true,
    },

    travelDate: {
      type: String,
      default: "",
    },

    passengers: {
      type: Number,
      default: 1,
      min: 1,
    },

    destination: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "bookings" }
);

const Booking = mongoose.model("Booking", bookingSchema);

// Test the backend
app.get("/", (req, res) => {
  res.send("TravelEase backend is running!");
});

// Get all bookings from MongoDB
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch error:", error.message);

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
});

// Save a new booking to MongoDB
app.post("/api/bookings", async (req, res) => {
  try {
    const {
      passengerName,
      bookingType,
      from,
      to,
      travelDate,
      passengers,
      destination,
    } = req.body;

    if (!passengerName || !bookingType) {
      return res.status(400).json({
        message: "Passenger name and booking type are required.",
      });
    }

    const booking = await Booking.create({
      passengerName,
      bookingType,
      from,
      to,
      travelDate,
      passengers,
      destination,
    });

    console.log("Booking saved:", booking._id);

    res.status(201).json({
      message: "Booking saved successfully!",
      booking,
    });
  } catch (error) {
    console.error("Booking save error:", error.message);

    res.status(400).json({
      message: "Could not save booking.",
      error: error.message,
    });
  }
});

// Connect to MongoDB and start the server
async function startServer() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is missing from backend/.env");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully!");

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Startup error:", error.message);
    process.exit(1);
  }
}

startServer();
