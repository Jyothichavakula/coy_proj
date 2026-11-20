
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
require("dotenv").config();

const Profile = require("./models/Profile");

const newProfiles = [
  {
    name: "Ishaan",
    age: 24,
    bio: "Exploring new places and making memories 🌍",
    interests: ["Travel", "Music", "Photography"],
    image: "https://i.pravatar.cc/500?img=11",
    city: "Hyderabad",
    college: "JNTU Hyderabad",
  },
  {
    name: "Meera",
    age: 22,
    bio: "Books, coffee and peaceful mornings ☕",
    interests: ["Reading", "Art", "Nature"],
    image: "https://i.pravatar.cc/500?img=32",
    city: "Bengaluru",
    college: "Christ University",
  },
  {
    name: "Rohan",
    age: 25,
    bio: "Tech enthusiast and weekend trekker 🏔️",
    interests: ["Coding", "Hiking", "Gaming"],
    image: "https://i.pravatar.cc/500?img=13",
    city: "Pune",
    college: "Pune University",
  },
  {
    name: "Diya",
    age: 23,
    bio: "Finding beauty in little things 🌸",
    interests: ["Dance", "Music", "Travel"],
    image: "https://i.pravatar.cc/500?img=47",
    city: "Chennai",
    college: "Anna University",
  },
  {
    name: "Kabir",
    age: 24,
    bio: "Fitness, football and good conversations ⚽",
    interests: ["Sports", "Fitness", "Movies"],
    image: "https://i.pravatar.cc/500?img=14",
    city: "Mumbai",
    college: "Mumbai University",
  },
  {
    name: "Anika",
    age: 21,
    bio: "Artist by heart, dreamer by nature 🎨",
    interests: ["Painting", "Reading", "Photography"],
    image: "https://i.pravatar.cc/500?img=48",
    city: "Delhi",
    college: "Delhi University",
  },
  {
    name: "Vihaan",
    age: 23,
    bio: "Always ready for an adventure 🚀",
    interests: ["Adventure", "Cycling", "Music"],
    image: "https://i.pravatar.cc/500?img=15",
    city: "Kochi",
    college: "CUSAT",
  },
  {
    name: "Tara",
    age: 22,
    bio: "Sunsets and spontaneous road trips 🌅",
    interests: ["Travel", "Cooking", "Movies"],
    image: "https://i.pravatar.cc/500?img=49",
    city: "Visakhapatnam",
    college: "Andhra University",
  },
  {
    name: "Arjun",
    age: 25,
    bio: "Building things and chasing big dreams 💻",
    interests: ["Technology", "Cricket", "Travel"],
    image: "https://i.pravatar.cc/500?img=16",
    city: "Hyderabad",
    college: "Osmania University",
  },
  {
    name: "Nisha",
    age: 23,
    bio: "A little bit of everything, a lot of curiosity ✨",
    interests: ["Fashion", "Music", "Cooking"],
    image: "https://i.pravatar.cc/500?img=50",
    city: "Bengaluru",
    college: "Bangalore University",
  },
];

async function addProfiles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const insertedProfiles = await Profile.insertMany(newProfiles);

    console.log(`${insertedProfiles.length} new profiles added successfully!`);
    console.log("Existing profiles, swipes and matches were preserved.");
  } catch (error) {
    console.error("Adding profiles failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

addProfiles();
