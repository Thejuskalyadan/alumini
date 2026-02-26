import express from "express";
import Announcement from "../models/Announcement.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// CREATE announcement
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, message, type } = req.body;

    const announcement = new Announcement({
      title,
      message,
      type,
      image: req.file ? req.file.filename : null,
    });

    await announcement.save();

    res.json({ message: "Announcement created" });
  } catch (err) {
    console.error(err); // ⭐ ADD THIS FOR DEBUGGING
    res.status(500).json({ message: "Error creating announcement" });
  }
});
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching announcements" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});
export default router;
