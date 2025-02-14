const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

//  User Model (Define Directly Here)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default:"user"},
});

const User = mongoose.model("User", userSchema);

//  Ensure Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//  Function to Create Admin User (Runs Once)
const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@123@gmail.com" });

    if (existingAdmin) {
      console.log(" Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = new User({
      username: "admin",
      email: "admin123@gmail.com", 
      password: hashedPassword,
    });

    await adminUser.save();
    console.log(" Admin user created successfully!");
  } catch (err) {
    console.error(" Error creating admin user:", err);
  }
};

// Run Admin Creation Once
createAdmin();

//  Register Route
router.post("/register", async (req, res) => {
  console.log(" Registration Attempt:", req.body);
  
  const { username, email, password} = req.body;

  try {
    //  Check if user already exists
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    //  Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Create new user
    const newUser = new User({ username, email, password: hashedPassword});
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(" Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//  Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(" Login Attempt:", { email, password });

  try {
    //  Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log(" User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //  Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(" Password Match:", isMatch);

    if (!isMatch) {
      console.log(" Incorrect password for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //  Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    console.log(" Login Successful:", user.username);
    res.status(200).json({ token, user });
  } catch (err) {
    console.error(" Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
