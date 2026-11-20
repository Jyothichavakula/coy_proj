const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
require("dotenv").config();

const Profile = require("./models/Profile");
const Swipe = require("./models/Swipe");


const profiles = [
  {
    name: "Aarav",
    age: 23,
    bio: "Coffee lover and weekend explorer ☕",
    interests: ["Travel", "Photography", "Music"],
    image: "https://i.pravatar.cc/500?img=12",
    city: "Hyderabad",
    college: "Osmania University",
  },
  {
    name: "Ananya",
    age: 22,
    bio: "Finding happiness in little things 🌸",
    interests: ["Reading", "Art", "Dancing"],
    image: "https://i.pravatar.cc/500?img=47",
    city: "Bengaluru",
    college: "Christ University",
  },
  {
    name: "Rohan",
    age: 24,
    bio: "Tech enthusiast and fitness lover",
    interests: ["Technology", "Fitness", "Movies"],
    image: "https://i.pravatar.cc/500?img=13",
    city: "Chennai",
    college: "Anna University",
  },
  {
    name: "Meera",
    age: 21,
    bio: "Exploring the world one trip at a time ✈️",
    interests: ["Travel", "Food", "Music"],
    image: "https://i.pravatar.cc/500?img=44",
    city: "Mumbai",
    college: "University of Mumbai",
  },
  {
    name: "Aditya",
    age: 25,
    bio: "Football, coding and good conversations",
    interests: ["Football", "Coding", "Gaming"],
    image: "https://i.pravatar.cc/500?img=14",
    city: "Pune",
    college: "Pune University",
  },
  {
    name: "Isha",
    age: 23,
    bio: "Art is my way of expressing myself 🎨",
    interests: ["Painting", "Books", "Nature"],
    image: "https://i.pravatar.cc/500?img=49",
    city: "Delhi",
    college: "Delhi University",
  },
  {
    name: "Kabir",
    age: 22,
    bio: "Always up for an adventure",
    interests: ["Hiking", "Photography", "Travel"],
    image: "https://i.pravatar.cc/500?img=15",
    city: "Visakhapatnam",
    college: "Andhra University",
  },
  {
    name: "Diya",
    age: 24,
    bio: "Music makes everything better 🎶",
    interests: ["Singing", "Music", "Dance"],
    image: "https://i.pravatar.cc/500?img=45",
    city: "Hyderabad",
    college: "JNTU Hyderabad",
  },
  {
    name: "Arjun",
    age: 26,
    bio: "Living life one day at a time",
    interests: ["Cricket", "Fitness", "Travel"],
    image: "https://i.pravatar.cc/500?img=16",
    city: "Kochi",
    college: "CUSAT",
  },
  {
    name: "Sneha",
    age: 22,
    bio: "Bookworm with big dreams 📚",
    interests: ["Reading", "Writing", "Coffee"],
    image: "https://i.pravatar.cc/500?img=48",
    city: "Vijayawada",
    college: "KL University",
  },
  {
    name: "Vikram",
    age: 25,
    bio: "Building things and chasing sunsets",
    interests: ["Coding", "Photography", "Movies"],
    image: "https://i.pravatar.cc/500?img=17",
    city: "Bengaluru",
    college: "RV College of Engineering",
  },
  {
    name: "Priya",
    age: 23,
    bio: "Foodie by heart ❤️",
    interests: ["Cooking", "Food", "Travel"],
    image: "https://i.pravatar.cc/500?img=46",
    city: "Guntur",
    college: "Acharya Nagarjuna University",
  },
  {
    name: "Karthik",
    age: 24,
    bio: "Sports keep me going",
    interests: ["Badminton", "Football", "Fitness"],
    image: "https://i.pravatar.cc/500?img=18",
    city: "Chennai",
    college: "SRM Institute of Science and Technology",
  },
  {
    name: "Nisha",
    age: 21,
    bio: "Nature lover and dreamer 🌿",
    interests: ["Nature", "Gardening", "Art"],
    image: "https://i.pravatar.cc/500?img=50",
    city: "Tirupati",
    college: "Sri Venkateswara University",
  },
  {
    name: "Rahul",
    age: 27,
    bio: "Making memories everywhere",
    interests: ["Travel", "Movies", "Music"],
    image: "https://i.pravatar.cc/500?img=19",
    city: "Mumbai",
    college: "VJTI Mumbai",
  },
  {
    name: "Tara",
    age: 22,
    bio: "Dancing through life 💃",
    interests: ["Dance", "Fashion", "Music"],
    image: "https://i.pravatar.cc/500?img=51",
    city: "Kolkata",
    college: "Jadavpur University",
  },
  {
    name: "Dev",
    age: 24,
    bio: "Curious mind, creative soul",
    interests: ["Design", "Technology", "Gaming"],
    image: "https://i.pravatar.cc/500?img=20",
    city: "Jaipur",
    college: "Manipal University Jaipur",
  },
  {
    name: "Riya",
    age: 23,
    bio: "Smiles, sunshine and coffee",
    interests: ["Coffee", "Books", "Travel"],
    image: "https://i.pravatar.cc/500?img=52",
    city: "Bhimavaram",
    college: "Shri Vishnu Engineering College for Women",
  },
  {
    name: "Manav",
    age: 26,
    bio: "Gym enthusiast and foodie",
    interests: ["Fitness", "Cooking", "Cricket"],
    image: "https://i.pravatar.cc/500?img=21",
    city: "Ahmedabad",
    college: "Nirma University",
  },
  {
    name: "Aditi",
    age: 22,
    bio: "Creating memories through my lens 📸",
    interests: ["Photography", "Travel", "Art"],
    image: "https://i.pravatar.cc/500?img=53",
    city: "Pune",
    college: "MIT World Peace University",
  },
  {
    name: "Sahil",
    age: 25,
    bio: "Adventure is out there",
    interests: ["Hiking", "Cycling", "Travel"],
    image: "https://i.pravatar.cc/500?img=22",
    city: "Dehradun",
    college: "DIT University",
  },
  {
    name: "Pooja",
    age: 24,
    bio: "A little bit of everything",
    interests: ["Music", "Food", "Reading"],
    image: "https://i.pravatar.cc/500?img=54",
    city: "Mysuru",
    college: "University of Mysore",
  },
  {
    name: "Nikhil",
    age: 23,
    bio: "Developer during the day, gamer at night",
    interests: ["Coding", "Gaming", "Movies"],
    image: "https://i.pravatar.cc/500?img=23",
    city: "Hyderabad",
    college: "IIIT Hyderabad",
  },
  {
    name: "Kavya",
    age: 21,
    bio: "Collecting moments, not things",
    interests: ["Travel", "Dance", "Photography"],
    image: "https://i.pravatar.cc/500?img=55",
    city: "Amaravati",
    college: "VIT-AP University",
  },
  {
    name: "Varun",
    age: 26,
    bio: "Passionate about sports and technology",
    interests: ["Cricket", "Technology", "Fitness"],
    image: "https://i.pravatar.cc/500?img=24",
    city: "Coimbatore",
    college: "PSG College of Technology",
  },
  {
    name: "Maya",
    age: 23,
    bio: "Art, coffee and endless conversations",
    interests: ["Painting", "Coffee", "Books"],
    image: "https://i.pravatar.cc/500?img=56",
    city: "New Delhi",
    college: "Jamia Millia Islamia",
  },
  {
    name: "Rishi",
    age: 24,
    bio: "Music is my escape 🎧",
    interests: ["Music", "Guitar", "Travel"],
    image: "https://i.pravatar.cc/500?img=25",
    city: "Mangaluru",
    college: "NIT Karnataka",
  },
  {
    name: "Sana",
    age: 22,
    bio: "Always curious, always learning",
    interests: ["Reading", "Technology", "Nature"],
    image: "https://i.pravatar.cc/500?img=57",
    city: "Lucknow",
    college: "University of Lucknow",
  },
  {
    name: "Akash",
    age: 25,
    bio: "Chasing goals and good vibes",
    interests: ["Fitness", "Football", "Travel"],
    image: "https://i.pravatar.cc/500?img=26",
    city: "Warangal",
    college: "NIT Warangal",
  },
  {
    name: "Neha",
    age: 23,
    bio: "Making every day colorful 🌈",
    interests: ["Art", "Fashion", "Music"],
    image: "https://i.pravatar.cc/500?img=58",
    city: "Bengaluru",
    college: "Mount Carmel College",
  },
];


async function seedProfiles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Profile.deleteMany({});
await Swipe.deleteMany({});

const insertedProfiles = await Profile.insertMany(profiles);

// Create 3 mock incoming Likes for the current user
const incomingLikes = [
  {
    swiperId: insertedProfiles[0]._id.toString(),
    targetId: "current-user",
    action: "like",
  },
  {
    swiperId: insertedProfiles[1]._id.toString(),
    targetId: "current-user",
    action: "like",
  },
  {
    swiperId: insertedProfiles[2]._id.toString(),
    targetId: "current-user",
    action: "like",
  },
];

await Swipe.insertMany(incomingLikes);

console.log(`${profiles.length} profiles inserted successfully!`);
console.log("3 mock incoming Likes created successfully!");
    await mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedProfiles();
