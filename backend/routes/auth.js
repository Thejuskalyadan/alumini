import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.status(405).json({
    message: "Use POST /api/auth/login with JSON body: { email, password }",
  });
});

router.get("/register", (req, res) => {
  res.status(405).json({
    message:
      "Use POST /api/auth/register with JSON body: { name, email, password, graduationYear, department }",
  });
});
// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret not configured" });
    }
    // ✅ CHECK APPROVAL STATUS 
    if (user.status !== "approved") {
      return res.status(403).json({
        message: "Account pending approval",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

   res.json({
     message: "Login successful",
     user: {
       id: user._id,
       email: user.email,
       role: user.role, 
     },
     token,
   });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, graduationYear, department } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      graduationYear,
      department,
    });

    await newUser.save();

    res.json({ message: "Registration Successful ✅" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

  router.get("/pending", async (req, res) => { 
  try {
    const users = await User.find({ status: "pending" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/approve/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "approved",
    });

    res.json({ message: "User Approved ✅" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
// get all users (for admin dashboard)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
// delete user (for admin dashboard)
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
