import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import announcementRoutes from "./routes/announcement.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);
app.use("/", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    availableRoutes: [
      "GET /",
      "POST /api/auth/register",
      "POST /api/auth/login",
      "POST /auth/register",
      "POST /auth/login",
      "POST /register",
      "POST /login",
    ],
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
