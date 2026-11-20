const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Profile = require("./models/Profile");
const Swipe = require("./models/Swipe");

async function addScreenshotProfiles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const profiles = [
      {
        name: "Ishita",
        age: 22,
        bio: "Collecting memories and chasing sunsets 🌅",
        interests: ["Travel", "Music", "Photography"],
        image: "https://i.pravatar.cc/500?img=47",
        city: "Hyderabad",
        college: "University of Hyderabad",
      },
      {
        name: "Rohan",
        age: 24,
        bio: "Coffee, coding, and long drives ☕",
        interests: ["Coding", "Travel", "Movies"],
        image: "https://i.pravatar.cc/500?img=13",
        city: "Bengaluru",
        college: "Christ University",
      },
      {
        name: "Meera",
        age: 21,
        bio: "Book lover with a creative soul 📚",
        interests: ["Reading", "Art", "Music"],
        image: "https://i.pravatar.cc/500?img=44",
        city: "Vijayawada",
        college: "Andhra University",
      },
      {
        name: "Arjun",
        age: 23,
        bio: "Always up for an adventure 🚀",
        interests: ["Sports", "Fitness", "Travel"],
        image: "https://i.pravatar.cc/500?img=14",
        city: "Chennai",
        college: "IIT Madras",
      },
      {
        name: "Diya",
        age: 22,
        bio: "Finding joy in the little things 🌸",
        interests: ["Dance", "Food", "Movies"],
        image: "https://i.pravatar.cc/500?img=45",
        city: "Visakhapatnam",
        college: "GITAM University",
      },
    ];

    const inserted = await Profile.insertMany(profiles);

    // Give the first new profile an incoming like for the match demo.
    await Swipe.create({
      swiperId: inserted[0]._id.toString(),
      targetId: "current-user",
      action: "like",
    });

    console.log("Added 5 fresh profiles successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

addScreenshotProfiles();