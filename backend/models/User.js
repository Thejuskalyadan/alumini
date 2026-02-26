import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  graduationYear: String,
  department: String,

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});

export default mongoose.model("User", userSchema);
