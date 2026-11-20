
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    bio: { type: String, default: "Hey! Nice to meet you." },
    interests: { type: [String], default: [] },
    image: { type: String, required: true },
    city: { type: String, default: "" },
    college: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
