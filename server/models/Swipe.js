
const mongoose = require("mongoose");

const swipeSchema = new mongoose.Schema(
  {
    swiperId: {
      type: String,
      required: true,
    },
    targetId: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: ["like", "pass"],
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate swipes by the same user on the same profile
swipeSchema.index(
  { swiperId: 1, targetId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Swipe", swipeSchema);
