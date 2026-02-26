import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: String,
  message: String,
  image: String,
  
  type: {
    type: String,
    enum: ["bulletin", "poster", "text"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Announcement", announcementSchema);
