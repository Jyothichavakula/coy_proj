const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const Swipe = require("./models/Swipe");

const CURRENT_USER_ID = "current-user";




app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.send("Coy Discover API is running!");
});

const Profile = require("./models/Profile");

// Get profiles for Discover feed
    // Get profiles that the current user has not swiped on
app.get("/feed", async (req, res) => {
  try {
    const swipedProfiles = await Swipe.find({
      swiperId: CURRENT_USER_ID,
    }).select("targetId");

    const swipedIds = swipedProfiles.map(
      (swipe) => swipe.targetId
    );

    const profiles = await Profile.find({
      _id: { $nin: swipedIds },
    });

    res.status(200).json({
      success: true,
      count: profiles.length,
      profiles: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
      error: error.message,
    });
  }
});


app.post("/swipe", async (req, res) => {
    try {
        const { targetId, action } = req.body;

        // Validate the request
        if (!targetId || !["like", "pass"].includes(action)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid targetId and action (like/pass).",
            });
        }

        // Check whether the profile exists
        const profile = await Profile.findById(targetId);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found.",
            });
        }

        // Check whether this profile was already swiped
        const existingSwipe = await Swipe.findOne({
            swiperId: CURRENT_USER_ID,
            targetId: targetId,
        });

        if (existingSwipe) {
            return res.status(409).json({
                success: false,
                message: "You have already swiped on this profile.",
            });
        }

        // Save the swipe
        await Swipe.create({
            swiperId: CURRENT_USER_ID,
            targetId: targetId,
            action: action,
        });

        // Check for a reciprocal like
         let matched = false;

            if (action === "like") {
            const incomingLike = await Swipe.findOne({
                swiperId: targetId,
                targetId: CURRENT_USER_ID,
                action: "like",
            });

            matched = !!incomingLike;
            }
        res.status(201).json({
            success: true,
            message: matched ? "It's a match!" : "Swipe saved successfully.",
            action: action,
            matched: matched,
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "You have already swiped on this profile.",
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to save swipe.",
            error: error.message,
        });
    }
});


// Get only mutual matches
app.get("/matches", async (req, res) => {
  try {
    // Find profiles that the current user has liked
    const myLikes = await Swipe.find({
      swiperId: CURRENT_USER_ID,
      action: "like",
    });

    const matches = [];

    for (const swipe of myLikes) {
      // Check whether that profile has also liked the current user
      const mutualLike = await Swipe.findOne({
        swiperId: swipe.targetId,
        targetId: CURRENT_USER_ID,
        action: "like",
      });

      if (mutualLike) {
        const profile = await Profile.findById(swipe.targetId);

        if (profile) {
          matches.push(profile);
        }
      }
    }

    res.status(200).json({
      success: true,
      count: matches.length,
      matches: matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch matches.",
      error: error.message,
    });
  }
});



// MongoDB Atlas connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas connected successfully!");

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    });
